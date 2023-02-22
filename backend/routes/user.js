import express from "express";
import {
  readData,
  writeData,
  writeDeleted,
  readDataDel,
  writePinned,
  readDataPinned,
} from "../utils/utils.js";
const router = express.Router();

/**
 * GET REQUESTS
 */
router.get("/v1/notes", async (req, res, next) => {
  await Promise.all([readDataPinned(), readData(), readDataDel()])
    .then((val) => {
      res.status(200).json({
        pinned: [...val[0]],
        unpinned: [...val[1]],
        deleted: [...val[2]],
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal error", error });
    });
});

// Promise.allSettled

router.get("/v1/trashbin", async (req, res, next) => {
  const data = await readDataDel();
  res.status(200).json(data);
});

/**
 * POST REQUESTS
 */

router.post("/v1/notes", async (req, res, next) => {
  const data = req.body;
  const prevState = await readData();
  await writeData([...prevState, { ...data }])
    .then((response) => {
      res.status(201).json({ message: "Succssfully added your Note" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to register your note", error });
    });
});

router.post("/v1/notes/editnote/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const { noteValue, titleValue } = req.body;
  const isNotePined = req.params.isnotepined;

  const pinnedNotes = await readDataPinned();
  const unPinnedNotes = await readData();
  let noteIndex;

  if (isNotePined === "true") {
    noteIndex = pinnedNotes.findIndex((n) => n.id === id);
    pinnedNotes[noteIndex].title = titleValue;
    pinnedNotes[noteIndex].note = noteValue;

    await writePinned([...pinnedNotes])
      .then((response) => {
        res.status(200).json({ message: "Sucessfully edited note" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal error", error });
      });
  } else {
    noteIndex = unPinnedNotes.findIndex((n) => n.id === id);
    unPinnedNotes[noteIndex].title = titleValue;
    unPinnedNotes[noteIndex].note = noteValue;
    await writeData([...unPinnedNotes])
      .then((response) => {
        res.status(200).json({ message: "Sucessfully edited note" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal error", error });
      });
  }
});

router.post("/v1/notes/sortnotes", async (req, res, next) => {
  const data = req.body;
  const isItPinned = req.query.isnotepined;
  console.log(typeof isItPinned);
  if (isItPinned === "true") {
    await writePinned(data)
      .then((response) => {
        res.status(200).json({ message: "Sorted your items Successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal error", error });
      });
  } else {
    await writeData(data)
      .then((response) => {
        res.status(200).json({ message: "Sorted your items Successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal error", error });
      });
  }
});

router.post("/v1/trashbin/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const data = await readDataDel();
  const restoredNote = data.find((n) => n.id === id);
  const currentState = await readData();
  try {
    await writeDeleted([...data.filter((n) => n.id !== id)]);
    await writeData([...currentState, { ...restoredNote }]);
    res.status(201).json({ message: "Restored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

router.post("/v1/trashbin", async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  console.log("REMOVING");
  const data = await readDataDel();
  try {
    await writeDeleted([...data.filter((n) => n.id !== id)]);
    res.status(200).json({ message: "Successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

router.post("/v1/notes/pinnote/:id", async (req, res, next) => {
  const pinned = await readDataPinned();
  const unpinned = await readData();
  const id = req.params.id.split(":")[1];
  const isItPinned = pinned.find((n) => n.id === id);
  const pinNote = unpinned.find((n) => n.id === id);
  console.log("pining note");
  if (isItPinned === undefined) {
    try {
      await writePinned([...pinned, { ...pinNote }]);
      await writeData([...unpinned.filter((n) => n.id !== id)]);
      return res.status(200).json({ message: "Successfully pinned" });
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }
  } else {
    try {
      await writePinned([...pinned.filter((n) => n.id !== id)]);
      await writeData([...unpinned, { ...isItPinned }]);
      return res.status(200).json({ message: "Successfully unpinned" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
});

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const color = req.body.color;
  const pinned = req.query.isnotepined;

  const pinnedNotes = await readDataPinned();
  const unPinnedNotes = await readData();

  let noteIndex;

  if (pinned === "true") {
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

export default router;
