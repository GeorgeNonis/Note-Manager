import express from "express";
// import { getDB } from "../data/database.js";
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
import { userBluePrint } from "../data/schema.js";
const router = express.Router();

/**
 * GET REQUESTS
 */

router.get("/v1/testing", async (req, res, next) => {
  // console.log("requesting");
  // const db = getDB();
  // console.log(db);
  const initialStateUser = {
    userId: 1995,
    email: "georgenonis@gmail.com",
    password: "Heyhey",
    notes: [],
    pinnedNotes: [],
    deletedNotes: [],
  };
  // db.collection("users")
  //   .insertOne(initialStateUser)
  const user = new userBluePrint({ ...initialStateUser });
  user
    .then((result) => {
      console.log(result);
      return res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/v1/testing1", async (req, res, next) => {
  const db = getDB();
  db.collection("users")
    .find({ userId: 1995 })
    .next()
    .then((result) => {
      console.log(result);
      return res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/v1/testing2", async (req, res, next) => {
  console.log("requesting");
  const db = getDB();

  const newData = {
    userId: 1995,
    email: "updatedEmail@gmail.com",
    password: "Goodnight",
    notes: [{ name: "Giorgos Nonis" }],
    pinnedNotes: [],
    deletedNotes: [],
  };
  db.collection("users")
    // .updateOne({ userId: 1995 }, { $set: newData })
    // .updateOne({ userId: 1995 }, { $set: { notes: [{ age: 28 }] } })
    .updateMany(
      { userId: 1995 },
      { $set: { notes: [{ age: 28 }], pinnedNotes: [{ pinned: false }] } }
    )
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
    .findById("6425b31f7a69a7ab5b8ecf71")
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

  // await Promise.all([
  //   readDataPinned(),
  //   readData(),
  //   readDataDel(),
  //   readDataLabels(),
  // ])
  //   .then((val) => {
  //     res.status(200).json({
  //       pinned: [...val[0]],
  //       unpinned: [...val[1]],
  //       deleted: [...val[2]],
  //       labels: [...val[3]],
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ message: "Internal error", error });
  //   });
});

// Promise.allSettled

router.get("/v1/trashbin", async (req, res, next) => {
  userBluePrint
    .findById("6425b31f7a69a7ab5b8ecf71")
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
    const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");

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

  try {
    const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
    const { unPinnedNotes } = response;
    response.unPinnedNotes = [...unPinnedNotes, { ...data }];
    response.save();

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
  try {
    const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
    const { pinnedNotes, unPinnedNotes } = response;

    const notes = pinned ? pinnedNotes : unPinnedNotes;
    const noteIndex = notes.findIndex((n) => n.id === id);
    const note = notes[noteIndex];
    note.title = titleValue;
    note.note = noteValue;
    pinned ? (response.pinnedNotes = notes) : (response.unPinnedNotes = notes);
    response.save();
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

  try {
    // const response = pinned ? await writePinned(data) : await writeData(data);
    const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
    pinned ? (response.pinnedNotes = data) : (response.unPinnedNotes = data);
    response.save();
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
  try {
    const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
    const { deletedNotes, unPinnedNotes } = response;
    const restoredNote = deletedNotes.find((n) => n.id === id);
    response.deletedNotes = [...deletedNotes.filter((n) => n.id !== id)];
    response.unPinnedNotes = [...unPinnedNotes, { ...restoredNote }];
    response.save();
    res.status(200).json({
      message: "Restored note Successfully",
    });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [error, null];
  }
});

router.post("/v1/trashbin", async (req, res, next) => {
  const id = req.body.id;
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { deletedNotes } = response;
  try {
    response.deletedNotes = [...deletedNotes.filter((n) => n.id !== id)];
    response.save();

    res.status(200).json({ message: "Successfully removed" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/pinnote/:id", async (req, res, next) => {
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
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

  try {
    response.save();
    return res.status(200).json({ message: "Successfully pinned" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { pinnedNotes, unPinnedNotes } = response;
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  const color = req.body.color;

  note.color = color;

  try {
    // const reponse = pinned
    //   ? await writePinned([...notes])
    //   : await writeData([...notes]);
    pinned ? (response.pinnedNotes = notes) : (response.unPinnedNotes = notes);
    response.save();
    res.status(200).json({ message: "Sucessfully updated note color" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/copynote/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { pinnedNotes, unPinnedNotes } = response;
  const { sharedId } = req.body;
  const notes = pinned ? pinnedNotes : unPinnedNotes;
  const note = notes.find((n) => n.id === id);

  try {
    response.unPinnedNotes = [...unPinnedNotes, { ...note, id: sharedId }];
    // const response = await writeData([
    //   ...unPinnedNotes,
    //   { ...note, id: sharedId },
    // ]);
    response.save();
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
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { labels } = response;
  const newLabel = id
    ? { label, labelId, notes: [{ id, pinned, checked: true }] }
    : { label, labelId, notes: [] };

  try {
    // const response = await writeDataLabels([...labels, newLabel]);
    response.labels = [...labels, { ...newLabel }];
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
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { labels } = response;
  const findLabelIndex = labels.findIndex((lb) => lb.label === label);
  const noteIndex = labels[findLabelIndex].notes.findIndex((n) => n.id === id);
  // console.log(noteIndex);
  if (noteIndex >= 0) {
    console.log("index exist");
    labels[findLabelIndex].notes[noteIndex].checked =
      !labels[findLabelIndex].notes[noteIndex].checked;
  } else {
    console.log("index doesnt exist");
    labels[findLabelIndex].notes.push({ id, checked: true, pinned });
  }

  try {
    response.labels = [...labels];
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
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");

  const { labels } = response;

  const newState = [...labels];
  const indexOfLabel = newState.findIndex((l) => l.label.trim() === label);

  newState[indexOfLabel].label = newLabel;
  try {
    response.labels = [...newState];
    res.status(200).json({ message: `Sucessfully edited ${label}` });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkboxes/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
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
  try {
    // const response = pinned
    //   ? await writePinned([...notes])
    //   : await writeData([...notes]);
    pinned ? (response.pinnedNotes = notes) : (response.unPinnedNotes = notes);
    response.save();
    res.status(200).json({ message: "Sucessfully handled checkboxes" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkbox/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { pinnedNotes, unPinnedNotes } = response;
  const { boxid, checked } = req.body;

  const notes = pinned ? pinnedNotes : unPinnedNotes;
  // const noteIndex = notes.findIndex((n) => n.id === id);
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
    pinned ? (response.pinnedNotes = notes) : (response.unPinnedNotes = notes);
    response.save();
    // const response = pinned
    //   ? await writePinned([...notes])
    //   : await writeData([...notes]);

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
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { deletedNotes, unPinnedNotes, pinnedNotes } = response;
  const prevState = pinned ? pinnedNotes : unPinnedNotes;
  const note = prevState.find((n) => n.id === id);

  if (!pinned) {
    response.unPinnedNotes = [...prevState.filter((n) => n.id != id)];
  } else {
    response.pinnedNotes = [...prevState.filter((n) => n.id != id)];
    // await writePinned([...prevState.filter((n) => n.id != id)]);
  }

  try {
    response.deletedNotes = [...deletedNotes, { ...note }];
    response.save();
    res.status(200).json({ message: "Deleted note successfully" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.delete(`/v1/notes/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1];
  const response = userBluePrint.findById("6425b31f7a69a7ab5b8ecf71");
  const { labels } = response;
  try {
    response.lables = [...labels.filter((l) => l.label !== label)];
    // const response = await writeDataLabels([
    //   ...labels.filter((l) => l.label !== label),
    // ]);
    response.save();
    res.status(200).json({ message: "Sucessfully deleted label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
