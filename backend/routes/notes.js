import express from "express";
// import { getDB } from "../data/database.js";
import {
  readData,
  writeData,
  writeDeleted,
  readDataDel,
  writePinned,
  readDataPinned,
  getAllNotes,
  readDataLabels,
  writeDataLabels,
  getIdPinnedStatus,
} from "../utils/utils.js";
import { userBluePrint } from "../data/schema.js";
const router = express.Router();

/**
 * GET REQUESTS
 */

router.get("/v1/testing", async (req, res, next) => {
  const initialStateUser = {
    userId: 1995,
    password: 1995,
    email: "georgenonis@gmail.com",
    unPinnedNotes: [],
    pinnedNotes: [],
    deletedNotes: [],
    labels: [],
  };
  const user = new userBluePrint({ ...initialStateUser });
  user
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/v1/notes", async (req, res, next) => {
  /**
   * Improve this and use Promise.allSettled
   */
  userBluePrint
    .findById("642d61213adbae2d3c5fd3ab")
    .then((user) => {
      res.status(200).json({
        pinned: [...user.pinnedNotes],
        unpinned: [...user.unPinnedNotes],
        deleted: [...user.deletedNotes],
        labels: [...user.labels],
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal error", error });
    });
});

// Promise.allSettled

router.get("/v1/trashbin", async (req, res, next) => {
  userBluePrint
    .findById("642d61213adbae2d3c5fd3ab")
    .then((user) => {
      res.status(200).json(user.deletedNotes);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal error", error });
    });
  // await readDataDel()
  //   .then((data) => {
  //     res.status(200).json(data);
  //   })
  //   .catch((error) => {
  //     return res.status(500).json({ message: "Internal error", error });
  //   });
});

router.get("/v1/notes/labels", async (req, res, next) => {
  try {
    const response = userBluePrint.findById("642d61213adbae2d3c5fd3ab");

    res.status(200).json(response.labels);
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

/**
 * POST REQUESTS
 */

router.post("/v1/notes", async (req, res, next) => {
  const data = req.body;
  console.log("requesting to post note");
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      console.log({ response });
      const { unPinnedNotes } = response;
      response.unPinnedNotes = [...unPinnedNotes, { ...data }];
      response.save();
      res.status(200).json({ message: "Sucessfully edited note" });
      return [response, null];
    });
  } catch (error) {
    console.log("theres error");
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/editnote/:id", async (req, res, next) => {
  const { noteValue, titleValue } = req.body;
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { pinnedNotes, unPinnedNotes } = response;

      const notes = pinned ? pinnedNotes : unPinnedNotes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];
      note.title = titleValue;
      note.note = noteValue;
      pinned
        ? (response.pinnedNotes = notes)
        : (response.unPinnedNotes = notes);
      response.save();
      res.status(200).json({ message: "Sucessfully edited note" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/sortnotes", async (req, res, next) => {
  const data = req.body;
  const pinned = req.query.isnotepined === "true";

  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      pinned ? (response.pinnedNotes = data) : (response.unPinnedNotes = data);
      response.save();
      res.status(200).json({
        message: "Sorted your items Successfully",
      });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/trashbin/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { deletedNotes, unPinnedNotes } = response;
      const restoredNote = deletedNotes.find((n) => n.id === id);
      response.deletedNotes = [...deletedNotes.filter((n) => n.id !== id)];
      response.unPinnedNotes = [...unPinnedNotes, { ...restoredNote }];
      response.save();
      res.status(200).json({
        message: "Restored note Successfully",
      });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [error, null];
  }
});

router.post("/v1/trashbin", async (req, res, next) => {
  const id = req.body.id;
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { deletedNotes } = response;
      response.deletedNotes = [...deletedNotes.filter((n) => n.id !== id)];
      response.save();

      res.status(200).json({ message: "Successfully removed" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/pinnote/:id", async (req, res, next) => {
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { pinnedNotes, unPinnedNotes } = response;
      const { id, isNotePined: pinned } = getIdPinnedStatus(req);
      const notes = pinned ? pinnedNotes : unPinnedNotes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];

      if (pinned) {
        response.pinnedNotes = [...pinnedNotes.filter((n) => n.id !== id)];
        response.unPinnedNotes = [...unPinnedNotes, { ...note }];
      } else {
        response.unPinnedNotes = [...unPinnedNotes.filter((n) => n.id !== id)];
        response.pinnedNotes = [...pinnedNotes, { ...note }];
      }

      response.save();
      res.status(200).json({ message: "Successfully pinned" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { pinnedNotes, unPinnedNotes } = response;
      const notes = pinned ? pinnedNotes : unPinnedNotes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];
      const color = req.body.color;

      note.color = color;
      pinned
        ? (response.pinnedNotes = notes)
        : (response.unPinnedNotes = notes);
      response.save();
      res.status(200).json({ message: "Sucessfully updated note color" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/copynote/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { pinnedNotes, unPinnedNotes } = response;
      const { sharedId } = req.body;
      const notes = pinned ? pinnedNotes : unPinnedNotes;
      const note = notes.find((n) => n.id === id);

      response.unPinnedNotes = [...unPinnedNotes, { ...note, id: sharedId }];
      response.save();
      res.status(200).json({ message: "Sucessfully copied note" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/labels/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { label, labelId } = req.body;
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { labels } = response;
      const newLabel = id
        ? { label, labelId, notes: [{ id, pinned, checked: true }] }
        : { label, labelId, notes: [] };

      response.labels = [...labels, { ...newLabel }];
      response.save();
      res.status(200).json({ message: "Sucessfully created label" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/label/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const label = req.query.label;
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { labels } = response;
      const findLabelIndex = labels.findIndex((lb) => lb.label === label);
      const noteIndex = labels[findLabelIndex].notes.findIndex(
        (n) => n.id === id
      );

      if (noteIndex >= 0) {
        console.log("index exist");
        labels[findLabelIndex].notes[noteIndex].checked =
          !labels[findLabelIndex].notes[noteIndex].checked;
      } else {
        console.log("index doesnt exist");
        labels[findLabelIndex].notes.push({ id, checked: true, pinned });
      }

      response.labels = [...labels];
      response.save();
      res.status(200).json({ message: "Sucessfully ticket/untickd label" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1].trim();
  const newLabel = req.body.newLabel;
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { labels } = response;

      const newState = [...labels];
      const indexOfLabel = newState.findIndex((l) => l.label.trim() === label);

      newState[indexOfLabel].label = newLabel;
      response.labels = [...newState];
      response.save();
      res.status(200).json({ message: `Sucessfully edited ${label}` });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkboxes/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { pinnedNotes, unPinnedNotes } = response;
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
      pinned
        ? (response.pinnedNotes = notes)
        : (response.unPinnedNotes = notes);
      response.save();
      res.status(200).json({ message: "Sucessfully handled checkboxes" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkbox/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { pinnedNotes, unPinnedNotes } = response;
      const { boxid, checked } = req.body;

      const notes = pinned ? pinnedNotes : unPinnedNotes;
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

      pinned
        ? (response.pinnedNotes = notes)
        : (response.unPinnedNotes = notes);
      response.save();
      res.status(200).json({ message: "Sucessfully handled checkbox" });
      return [response, null];
    });
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
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { deletedNotes, unPinnedNotes, pinnedNotes } = response;
      const prevState = pinned ? pinnedNotes : unPinnedNotes;
      const note = prevState.find((n) => n.id === id);

      if (!pinned) {
        response.unPinnedNotes = [...prevState.filter((n) => n.id != id)];
      } else {
        response.pinnedNotes = [...prevState.filter((n) => n.id != id)];
      }

      response.deletedNotes = [...deletedNotes, { ...note }];
      response.save();
      res.status(200).json({ message: "Deleted note successfully" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.delete(`/v1/notes/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1];
  try {
    userBluePrint.findById("642d61213adbae2d3c5fd3ab").then((response) => {
      const { labels } = response;
      response.lables = [...labels.filter((l) => l.label !== label)];
      response.save();
      res.status(200).json({ message: "Sucessfully deleted label" });
      return [response, null];
    });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
