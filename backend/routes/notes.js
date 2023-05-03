import express from "express";
import bcrypt from "bcrypt";
import { createUser, getIdPinnedStatus } from "../utils/utils.js";
import UserBluePrint from "../data/schema.js";
const router = express.Router();

/**
 * GET REQUESTS
 */

/**
 * Create user manually for testing purposes
 */

router.get(`/v1/testing`, async (req, res, next) => {
  const user = {
    userId: 6969,
    email: "georgenonis@gmail.com",
    password: 0,
    notes: [],
    deletedNotes: [],
    pinnedNotes: [],
    archivedNotes: [],
    labels: [],
  };
  const newUser = new UserBluePrint({ ...user });

  newUser
    .save()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
});

router.get("/v1/notes", async (req, res, next) => {
  /**
   * Improve this and use Promise.allSettled
   */
  UserBluePrint.findById("642d61213adbae2d3c5fd3ab")
    .then((user) => {
      // console.log(user);
      res.status(200).json({
        pinned: [...user.pinnedNotes],
        unpinned: [...user.unPinnedNotes],
        archivedNotes: [...user.archivedNotes],
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
  UserBluePrint.findById("642d61213adbae2d3c5fd3ab")
    .then((user) => {
      res.status(200).json(user.deletedNotes);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal error", error });
    });
});

router.get("/v1/notes/labels", async (req, res, next) => {
  try {
    const response = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");

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

router.get(`/v1/userexist`, async (req, res, next) => {
  const email = req.query.email;
  // console.log({ email });

  const allUsers = await UserBluePrint.find({});
  console.log({ allUsers });
  const duplicate = allUsers.some((user) => {
    // console.log(user.email);
    return user.email.toLowerCase() === email.toLowerCase();
  });

  console.log({ duplicate, email });

  try {
    if (duplicate) {
      console.log("Account with this email exists already");
      return res
        .status(201)
        .json({ message: `Account with this email exist's already` });
    } else {
      console.log("No account associated with this email");
      return res
        .status(200)
        .json({ message: `No account associated with this email` });
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
});

router.post("/v1/signup", async (req, res, next) => {
  console.log("SIGNUP PROCESS");
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const users = await UserBluePrint.find({ email: email }).exec();
  const duplicate = users.map((user) => {
    return user.email.toLowerCase() === email.toLowerCase();
  });
  console.log({ duplicate, users });
  // console.log(Array.isArray(duplicate));
  /**
   * Check for duplicates in Database
   */
  if (duplicate.length > 0) {
    return res.sendStatus(409);
  }
  console.log({ duplicate, email, pwd });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const user = createUser(email, hashedPwd);
    const newUser = new UserBluePrint({ ...user });

    const response = await newUser
      .save()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    res.status(200).json(response);
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes", async (req, res, next) => {
  const data = req.body;
  console.log("requesting to post note");
  try {
    const userdata = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { unPinnedNotes } = userdata;
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      { unPinnedNotes: [...unPinnedNotes, { ...data }] }
    );
    res.status(200).json({ message: "Sucessfully edited note" });
    return [response, null];
  } catch (error) {
    console.log("theres error");
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/editnote/:id", async (req, res, next) => {
  console.log(req.query);
  const { noteValue, titleValue } = req.body;
  const archived = req.query.isarchived === "true";
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
  const { pinnedNotes, unPinnedNotes, archivedNotes } = data;
  console.log({ data });
  console.log({ archivedNotes });
  const notes = archived ? archivedNotes : pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  note.title = titleValue;
  note.note = noteValue;

  try {
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      archived
        ? { archivedNotes: [...notes] }
        : pinned
        ? { pinnedNotes: [...notes] }
        : { unPinnedNotes: [...notes] }
    );
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
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      pinned ? { pinnedNotes: [...data] } : { unPinnedNotes: [...data] }
    );
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
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    console.log({ data });
    const { deletedNotes, unPinnedNotes } = data;
    const restoredNote = deletedNotes.find((n) => n.id === id);
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        deletedNotes: [...deletedNotes.filter((n) => n.id !== id)],
        unPinnedNotes: [...unPinnedNotes, { ...restoredNote }],
      }
    );

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
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { deletedNotes } = data;
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        deletedNotes: [...deletedNotes.filter((n) => n.id !== id)],
      }
    );

    res.status(200).json({ message: "Successfully removed" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/pinnote/:id", async (req, res, next) => {
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { pinnedNotes, unPinnedNotes } = data;
    const { id, isNotePined: pinned } = getIdPinnedStatus(req);
    const notes = pinned ? pinnedNotes : unPinnedNotes;
    const noteIndex = notes.findIndex((n) => n.id === id);
    const note = notes[noteIndex];

    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      pinned
        ? {
            pinnedNotes: [...pinnedNotes.filter((n) => n.id !== id)],
            unPinnedNotes: [...unPinnedNotes, { ...note }],
          }
        : {
            pinnedNotes: [...pinnedNotes, { ...note }],
            unPinnedNotes: [...unPinnedNotes.filter((n) => n.id !== id)],
          }
    );
    res.status(200).json({ message: "Successfully pinned" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  // const archived = req.query.isarchived === "true";

  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { pinnedNotes, unPinnedNotes, archivedNotes } = data;
    const notes = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
    const noteIndex = notes.findIndex((n) => n.id === id);
    const note = notes[noteIndex];
    const color = req.body.color;

    note.color = color;
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      archived
        ? { archivedNotes: [...notes] }
        : pinned
        ? { pinnedNotes: [...notes] }
        : { unPinnedNotes: [...notes] }
    );

    res.status(200).json({ message: "Sucessfully updated note color" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/copynote/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { pinnedNotes, unPinnedNotes, archivedNotes } = data;
    const { sharedId } = req.body;
    const notes = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
    const note = notes.find((n) => n.id === id);
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        unPinnedNotes: [...unPinnedNotes, { ...note, id: sharedId }],
      }
    );
    // response.unPinnedNotes = [...unPinnedNotes, { ...note, id: sharedId }];

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
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { labels } = data;
    const newLabel = id
      ? { label, labelId, notes: [{ id, pinned, checked: true }] }
      : { label, labelId, notes: [] };

    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        labels: [...labels, { ...newLabel }],
      }
    );
    // response.labels = [...labels, { ...newLabel }];

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
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { labels } = data;
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

    // response.labels = [...labels];
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        labels: [...labels],
      }
    );
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
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { labels } = data;

    const newState = [...labels];
    const indexOfLabel = newState.findIndex((l) => l.label.trim() === label);

    newState[indexOfLabel].label = newLabel;
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        labels: [...newState],
      }
    );
    // response.labels = [...newState];
    // response.save();
    res.status(200).json({ message: `Sucessfully edited ${label}` });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkboxes/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { pinnedNotes, unPinnedNotes, archivedNotes } = data;
    const { uncheckednote } = req.body;
    const notes = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
    const note = notes.find((n) => n.id === id);

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
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      archived
        ? { archivedNotes: [...notes] }
        : pinned
        ? {
            pinnedNotes: [...notes],
          }
        : { unPinnedNotes: [...notes] }
    );

    res.status(200).json({ message: "Sucessfully handled checkboxes" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/checkbox/:id`, async (req, res, next) => {
  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { pinnedNotes, unPinnedNotes, archivedNotes } = data;
    const { boxid, checked } = req.body;

    const notes = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
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
    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      archived
        ? { archivedNotes: [...notes] }
        : pinned
        ? {
            pinnedNotes: [...notes],
          }
        : { unPinnedNotes: [...notes] }
    );

    res.status(200).json({ message: "Sucessfully handled checkbox" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/archivenote/:id", async (req, res, next) => {
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);

  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { unPinnedNotes, pinnedNotes, archivedNotes } = data;
    const notes = pinned ? pinnedNotes : unPinnedNotes;
    const note = notes.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      pinned
        ? {
            archivedNotes: [...archivedNotes, { ...note }],
            pinnedNotes: [...pinnedNotes.filter((n) => n.id !== id)],
          }
        : {
            archivedNotes: [...archivedNotes, { ...note }],
            unPinnedNotes: [...unPinnedNotes.filter((n) => n.id !== id)],
          }
    );

    res.status(200).json({ message: "Archived note successfully" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/unarchivenote/:id", async (req, res, next) => {
  const { id } = getIdPinnedStatus(req);

  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { unPinnedNotes, archivedNotes } = data;
    const notes = archivedNotes;
    const note = notes.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      {
        archivedNotes: [...archivedNotes.filter((n) => n.id !== id)],
        unPinnedNotes: [...unPinnedNotes, { ...note }],
      }
    );

    res.status(200).json({ message: "Archived note successfully" });
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
  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { deletedNotes, unPinnedNotes, pinnedNotes, archivedNotes } = data;
    const prevState = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
    const note = prevState.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      archived
        ? {
            archivedNotes: [...prevState.filter((n) => n.id != id)],
            deletedNotes: [...deletedNotes, { ...note }],
          }
        : pinned
        ? {
            pinnedNotes: [...prevState.filter((n) => n.id != id)],
            deletedNotes: [...deletedNotes, { ...note }],
          }
        : {
            unPinnedNotes: [...prevState.filter((n) => n.id != id)],
            deletedNotes: [...deletedNotes, { ...note }],
          }
    );

    res.status(200).json({ message: "Deleted note successfully" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.delete(`/v1/notes/labels/:label`, async (req, res, next) => {
  const label = req.params.label.split(":")[1];
  try {
    const data = await UserBluePrint.findById("642d61213adbae2d3c5fd3ab");
    const { labels } = data;

    const response = await UserBluePrint.updateOne(
      { userId: 1995 },
      { labels: [...labels.filter((l) => l.label !== label)] }
    );

    res.status(200).json({ message: "Sucessfully deleted label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
