import express from "express";
import {
  readData,
  writeData,
  writeDeleted,
  readDataDel,
  writePinned,
  readDataPinned,
  getIdPinnedStatus,
  getAllNotes,
  readDataLabels,
  writeDataLabels,
} from "../utils/utils.js";
const router = express.Router();

/**
 * GET REQUESTS
 */
router.get("/v1/notes", async (req, res, next) => {
  /**
   * Improve this and use Promise.allSettled
   */
  await Promise.all([
    readDataPinned(),
    readData(),
    readDataDel(),
    readDataLabels(),
  ])
    .then((val) => {
      res.status(200).json({
        pinned: [...val[0]],
        unpinned: [...val[1]],
        deleted: [...val[2]],
        labels: [...val[3]],
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal error", error });
    });
});

// Promise.allSettled

router.get("/v1/trashbin", async (req, res, next) => {
  await readDataDel()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal error", error });
    });
});

router.get("/v1/notes/labels", async (req, res, next) => {
  try {
    const labels = await readDataLabels();
    res.status(200).json(labels);
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

/**
 * POST REQUESTS
 */

router.post("/v1/notes", async (req, res, next) => {
  const data = req.body;
  const prevState = await readData();
  console.log(data);
  console.log("Posting note");
  try {
    const response = await writeData([...prevState, { ...data }]);
    console.log("theres NOT error");
    res.status(200).json({ message: "Sucessfully edited note" });
    return [response, null];
  } catch (error) {
    console.log("theres error");
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/editnote/:id", async (req, res, next) => {
  const { noteValue, titleValue } = req.body;
  const { id, isNotePined } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  console.log({ noteValue, titleValue, id, isNotePined });
  let noteIndex;

  if (isNotePined === "true") {
    noteIndex = pinnedNotes.findIndex((n) => n.id === id);
    pinnedNotes[noteIndex].title = titleValue;
    pinnedNotes[noteIndex].note = noteValue;

    await writePinned([...pinnedNotes])
      .then((response) => {
        return res.status(200).json({ message: "Sucessfully edited note" });
      })
      .catch((error) => {
        return res.status(500).json({ message: "Internal error", error });
      });
  } else {
    noteIndex = unPinnedNotes.findIndex((n) => n.id === id);
    console.log(unPinnedNotes[noteIndex]);
    unPinnedNotes[noteIndex].title = titleValue;
    unPinnedNotes[noteIndex].note = noteValue;
    try {
      await writeData([...unPinnedNotes]);
      return res.status(200).json({ message: "Sucessfully edited note" });
    } catch (error) {
      return res.status(500).json({ message: "Internal error", error });
    }
  }
});

router.post("/v1/notes/sortnotes", async (req, res, next) => {
  const data = req.body;
  const isNotePined = req.query.isnotepined;
  console.log(isNotePined);
  if (isNotePined === "true") {
    try {
      await writePinned(data);
      return res.status(200).json({
        message: "Sorted your items Successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal error", error });
    }
  } else {
    try {
      await writeData(data);
      res.status(200).json({
        message: "Sorted your items Successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal error", error });
    }
  }
});

router.post("/v1/trashbin/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const data = await readDataDel();
  const pinnedNotes = await readData();
  const restoredNote = data.find((n) => n.id === id);
  await writeDeleted([...data.filter((n) => n.id !== id)])
    .then(async () => {
      await writeData([...pinnedNotes, { ...restoredNote }]);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal error", error });
    })
    .then(() => {
      console.log("not error");
      res.status(201).json({ message: "Restored successfully" });
    })
    .catch((error) => {
      console.log("throwing error");
      res.status(500).json({ message: "Internal error", error });
    });
});

router.post("/v1/trashbin", async (req, res, next) => {
  const id = req.body.id;

  const data = await readDataDel();
  await writeDeleted([...data.filter((n) => n.id !== id)])
    .then((response) => {
      res.status(200).json({ message: "Successfully removed" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal error", error });
    });
});

router.post("/v1/notes/pinnote/:id", async (req, res, next) => {
  const pinned = await readDataPinned();
  const unpinned = await readData();
  const id = req.params.id.split(":")[1];
  const isItPinned = pinned.find((n) => n.id === id);
  const pinNote = unpinned.find((n) => n.id === id);
  console.log("pining note");
  if (isItPinned === undefined) {
    await writePinned([...pinned, { ...pinNote }])
      .then(async () => {
        await writeData([...unpinned.filter((n) => n.id !== id)]);
      })
      .then(() => {
        return res.status(200).json({ message: "Successfully pinned" });
      })
      .catch((error) => {
        return res.status(500).json({ message: "Internal error", error });
      });
  } else {
    await writePinned([...pinned.filter((n) => n.id !== id)])
      .then(async () => {
        await writeData([...unpinned, { ...isItPinned }]);
      })
      .then(() => {
        return res.status(200).json({ message: "Successfully unpinned" });
      })
      .catch((error) => {
        return res.status(500).json({ message: "Something went wrong", error });
      });
  }
});

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  const { id, isNotePined } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const color = req.body.color;
  let noteIndex;

  if (isNotePined === "true") {
    noteIndex = pinnedNotes.findIndex((n) => n.id === id);
    pinnedNotes[noteIndex].color = color;

    await writePinned([...pinnedNotes])
      .then((response) => {
        res.status(200).json({ message: "Sucessfully added color" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal error", error });
      });
  } else {
    noteIndex = unPinnedNotes.findIndex((n) => n.id === id);
    unPinnedNotes[noteIndex].color = color;
    await writeData([...unPinnedNotes])
      .then((response) => {
        res.status(200).json({ message: "Sucessfully added color" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal error", error });
      });
  }
});

router.post(`/v1/notes/copynote/:id`, async (req, res, next) => {
  const { id, isNotePined } = getIdPinnedStatus(req);
  const pinned = isNotePined === "true";
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const { sharedId } = req.body;
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  let note = notes.find((n) => n.id === id);

  try {
    await writeData([...notes, { ...note, id: sharedId }]);
    return res.status(200).json({ message: "Sucessfully copied note" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post(`/v1/notes/labels/:id`, async (req, res, next) => {
  const { id, isNotePined } = getIdPinnedStatus(req);
  const pinned = isNotePined === "true";
  const { label, labelId } = req.body;
  const labels = await readDataLabels();
  const newLabel = id
    ? { label, labelId, notes: [{ id, pinned, checked: true }] }
    : { label, labelId, notes: [] };

  try {
    await writeDataLabels([...labels, newLabel]);
    return res.status(200).json({ message: "Sucessfully created label" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post(`/v1/notes/label/:id`, async (req, res, next) => {
  const { id } = getIdPinnedStatus(req);
  const label = req.query.label;
  const pinned = req.query.isnotepined === "true";
  const labels = await readDataLabels();
  const findLabelIndex = labels.findIndex((lb) => lb.label === label);
  const noteIndex = labels[findLabelIndex].notes.findIndex((n) => n.id === id);
  console.log(noteIndex);
  if (noteIndex >= 0) {
    console.log("index exist");
    labels[findLabelIndex].notes[noteIndex].checked =
      !labels[findLabelIndex].notes[noteIndex].checked;
  } else {
    console.log("index doesnt exist");
    labels[findLabelIndex].notes.push({ id, checked: true, pinned });
  }

  try {
    await writeDataLabels([...labels]);
    return res
      .status(200)
      .json({ message: "Sucessfully ticket/untickd label" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post(`/v1/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1].trim();
  const newLabel = req.body.newLabel;
  const labels = await readDataLabels();

  const newState = [...labels];
  const indexOfLabel = newState.findIndex((l) => l.label.trim() === label);

  newState[indexOfLabel].label = newLabel;
  try {
    await writeDataLabels([...newState]);
    return res.status(200).json({ message: `Sucessfully edited ${label}` });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post(`/v1/notes/checkboxes/:id`, async (req, res, next) => {
  const { id, isNotePined } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const pinned = isNotePined === "true";
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  let note = notes.find((n) => n.id === id);

  if (!note.createCheckboxes) {
    const setences = note.note
      ? note.note.split(/\r\n|\r|\n/).filter((el) => el.length > 0)
      : [""];
    const uncheckednote = [
      ...setences.map((s) => {
        return { note: s, id: crypto.randomUUID() };
      }),
    ];
    note.unChecked = [...uncheckednote];
    note.checked = [];

    note.createCheckboxes = true;
  } else {
    note.unChecked = [];
    note.checked = [];
    note.createCheckboxes = false;
  }

  note.checkbox = !note.checkbox;
  try {
    pinned ? await writePinned([...notes]) : await writeData([...notes]);
    return res.status(200).json({ message: "Sucessfully handled checkboxes" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post(`/v1/notes/checkbox/:id`, async (req, res, next) => {
  const { id, isNotePined } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const { boxid, checked } = req.body;
  const pinned = isNotePined === "true";

  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  let checkbox;
  if (checked) {
    checkbox = note.checked.find((b) => b.id === boxid);
    note.checked = [...note.checked.filter((b) => b.id !== boxid)];
    note.unChecked?.push(checkbox);
  } else {
    checkbox = note.unChecked?.find((b) => b.id === boxid);
    note.unChecked = [...note.unChecked?.filter((b) => b.id !== boxid)];
    note.checked?.push(checkbox);
  }

  try {
    pinned ? await writePinned([...notes]) : await writeData([...notes]);

    return res.status(200).json({ message: "Sucessfully handled checkboxes" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

/**
 * DELETE REQUESTS
 */

router.delete("/v1/notes/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const isNotePined = req.query.isnotepined;
  const prevStateDel = await readDataDel();
  let prevState;
  let note;
  console.log(id);
  console.log(typeof isNotePined);
  if (isNotePined === "false") {
    prevState = await readData();
    note = prevState.find((n) => n.id === id);
    console.log(note);
    await writeData([...prevState.filter((n) => n.id != id)]);
  } else {
    prevState = await readDataPinned();
    console.log(note);
    note = prevState.find((n) => n.id === id);

    await writePinned([...prevState.filter((n) => n.id != id)]);
  }
  await writeDeleted([...prevStateDel, note]);
  res.status(200).json({ message: "Deleted note successfully" });
});

router.delete(`/v1/notes/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1];

  const labels = await readDataLabels();
  try {
    await writeDataLabels([...labels.filter((l) => l.label !== label)]);
    return res.status(200).json({ message: "Sucessfully deleted label" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

export default router;
