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
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();

  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  note.title = titleValue;
  note.note = noteValue;
  try {
    const response = pinned
      ? await writePinned([...notes])
      : await writeData([...notes]);
    res.status(200).json({ message: "Sucessfully edited note" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/sortnotes", async (req, res, next) => {
  const data = req.body;
  const pinned = req.query.isnotepined === "true";
  console.log({ data });
  console.log({ pinned });
  console.log(typeof pinned);

  try {
    const response = pinned ? await writePinned(data) : await writeData(data);
    res.status(200).json({
      message: "Sorted your items Successfully",
    });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
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
  try {
    const response = await writeDeleted([...data.filter((n) => n.id !== id)]);
    res.status(200).json({ message: "Successfully removed" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/pinnote/:id", async (req, res, next) => {
  let { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  /**
   * PREPI NA TO PIASO POU TO ARRAY POU EINAI JAI NA TO VALO STO ANTISTROFO(UNPINNED)
   * ARA AN EINAI PINNED VRISKO TO ARRAY. VRISKO TO NOTE. AFERO TO POU TO ARRAY TOU
   * JE VALO TO STO ANTISTROFO ARRAY (UNPINNED)
   */
  console.log("blablasdasds");
  if (pinned) {
    pinnedNotes = [...pinnedNotes.filter((n) => n.id !== id)];
    unPinnedNotes = [...unPinnedNotes, { ...note }];
  } else {
    unPinnedNotes = [...unPinnedNotes.filter((n) => n.id !== id)];
    pinnedNotes = [...pinnedNotes, { ...note }];
  }

  try {
    await writeData([...unPinnedNotes])
      .then(async () => {
        await writePinned([...pinnedNotes]);
      })
      .then(() => {
        return res.status(200).json({ message: "Successfully pinned" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  const color = req.body.color;

  note.color = color;

  try {
    const reponse = pinned
      ? await writePinned([...notes])
      : await writeData([...notes]);
    res.status(200).json({ message: "Sucessfully updated note color" });
    return [reponse, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/copynote/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const { sharedId } = req.body;
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const note = notes.find((n) => n.id === id);

  try {
    const response = await writeData([
      ...unPinnedNotes,
      { ...note, id: sharedId },
    ]);
    res.status(200).json({ message: "Sucessfully copied note" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/labels/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { label, labelId } = req.body;
  const labels = await readDataLabels();
  const newLabel = id
    ? { label, labelId, notes: [{ id, pinned, checked: true }] }
    : { label, labelId, notes: [] };

  try {
    const response = await writeDataLabels([...labels, newLabel]);
    res.status(200).json({ message: "Sucessfully created label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/label/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const label = req.query.label;
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
    const response = await writeDataLabels([...labels]);
    res.status(200).json({ message: "Sucessfully ticket/untickd label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
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
    const response = await writeDataLabels([...newState]);
    res.status(200).json({ message: `Sucessfully edited ${label}` });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkboxes/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const { uncheckednote } = req.body;
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  let note = notes.find((n) => n.id === id);

  if (!note.createCheckboxes) {
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
    const response = pinned
      ? await writePinned([...notes])
      : await writeData([...notes]);
    res.status(200).json({ message: "Sucessfully handled checkboxes" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkbox/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { pinnedNotes, unPinnedNotes } = await getAllNotes();
  const { boxid, checked } = req.body;

  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  // const note = notes[noteIndex];
  const note = notes.find((n) => n.id === id);

  let checkbox;
  if (checked) {
    checkbox = note.checked.find((b) => b.id === boxid);
    note.checked = [...note.checked.filter((b) => b.id !== boxid)];
    note.unChecked?.push(checkbox);
  } else {
    checkbox = note.unChecked?.find((b) => b.id === boxid);
    note.checked?.push(checkbox);
    note.unChecked = [...note.unChecked?.filter((b) => b.id !== boxid)];
  }

  try {
    const response = pinned
      ? await writePinned([...notes])
      : await writeData([...notes]);

    res.status(200).json({ message: "Sucessfully handled checkbox" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

/**
 * DELETE REQUESTS
 */

router.delete("/v1/notes/:id", async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const prevStateDel = await readDataDel();
  let prevState;
  let note;

  if (!pinned) {
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
  try {
    const response = await writeDeleted([...prevStateDel, note]);
    res.status(200).json({ message: "Deleted note successfully" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.delete(`/v1/notes/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1];

  const labels = await readDataLabels();
  try {
    const response = await writeDataLabels([
      ...labels.filter((l) => l.label !== label),
    ]);
    res.status(200).json({ message: "Sucessfully deleted label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
