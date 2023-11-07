import express from "express";
import bcrypt from "bcrypt";
import { getIdPinnedStatus } from "../utils/utils.js";
import UserBluePrint from "../data/schema.js";
const router = express.Router();

/**
 * GET REQUESTS
 */

router.get("/notes", async (req, res, next) => {
  const email = req.user;

  try {
    const user = await UserBluePrint.findOne({ email }).exec();
    res.status(200).json({
      ...user,
    });
    return [user, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.get("/trashbin", async (req, res, next) => {
  const email = req.user;

  UserBluePrint.findOne({ email })
    .exec()
    .then((user) => {
      res.status(200).json(user.deletedNotes);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal error", error });
    });
});

router.get("/notes/labels", async (req, res, next) => {
  const email = req.user;

  try {
    const response = await UserBluePrint.findOne({ email }).exec();

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

router.post("/notes", async (req, res, next) => {
  const data = req.body;
  const email = req.user;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { unPinnedNotes } = user;
    const response = await UserBluePrint.updateOne(
      { email: email },
      {
        unPinnedNotes: [...unPinnedNotes, { ...data }],
        lastTimeDitedNote: lastTimeDitedNote,
      }
    ).exec();

    res.status(200).json({ message: "Sucessfully edited note" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/notes/editnote/:id", async (req, res, next) => {
  const email = req.user;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  const { noteValue, titleValue } = req.body;
  const archived = req.query.isarchived === "true";
  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const user = await UserBluePrint.findOne({ email }).exec();

  const { pinnedNotes, unPinnedNotes, archivedNotes } = user;

  const notes = archived ? archivedNotes : pinned ? pinnedNotes : unPinnedNotes;
  const noteIndex = notes.findIndex((n) => n.id === id);
  const note = notes[noteIndex];
  note.title = titleValue;
  note.note = noteValue;

  try {
    const response = await UserBluePrint.updateOne(
      { email },
      archived
        ? { archivedNotes: [...notes], lastTimeDitedNote }
        : pinned
        ? { pinnedNotes: [...notes], lastTimeDitedNote }
        : { unPinnedNotes: [...notes], lastTimeDitedNote }
    );
    res.status(200).json({ message: "Sucessfully edited note" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/notes/sortnotes", async (req, res, next) => {
  const email = req.user;

  const { data } = req.body;
  const pinned = req.query.isnotepined === "true";

  try {
    const response = await UserBluePrint.updateOne(
      { email },
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

router.post("/trashbin/:id", async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const id = req.params.id.split(":")[1];

  try {
    const user = await UserBluePrint.findOne({ email }).exec();
    const { deletedNotes, unPinnedNotes } = user;
    const restoredNote = deletedNotes.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { email },
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

router.post("/notes/pinnote/:id", async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { pinnedNotes, unPinnedNotes } = user;
    const { id, isNotePined: pinned } = getIdPinnedStatus(req);
    const notes = pinned ? pinnedNotes : unPinnedNotes;
    const noteIndex = notes.findIndex((n) => n.id === id);
    const note = notes[noteIndex];

    const response = await UserBluePrint.updateOne(
      { email },
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

router.post("/notes/colorupdate/:id", async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { pinnedNotes, unPinnedNotes, archivedNotes } = user;
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
      { email },
      archived
        ? { archivedNotes: [...notes], lastTimeDitedNote }
        : pinned
        ? { pinnedNotes: [...notes], lastTimeDitedNote }
        : { unPinnedNotes: [...notes], lastTimeDitedNote }
    );

    res.status(200).json({ message: "Sucessfully updated note color" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/notes/copynote/:id`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { pinnedNotes, unPinnedNotes, archivedNotes } = user;
    const { sharedId } = req.body;
    const notes = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
    const note = notes.find((n) => n.id === id);
    const response = await UserBluePrint.updateOne(
      { email },
      {
        unPinnedNotes: [...unPinnedNotes, { ...note, id: sharedId }],
      }
    );

    res.status(200).json({ message: "Sucessfully copied note" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/notes/labels/:id`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const { label, labelId } = req.body;

  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { labels } = user;
    const newLabel = id
      ? { label, labelId, notes: [{ id, pinned, checked: true }] }
      : { label, labelId, notes: [] };

    const response = await UserBluePrint.updateOne(
      { email },
      {
        labels: [...labels, { ...newLabel }],
      }
    );

    res.status(200).json({ message: "Sucessfully created label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/notes/label/:id`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const { id, isNotePined: pinned } = getIdPinnedStatus(req);
  const label = req.query.label;

  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { labels } = user;
    const findLabelIndex = labels.findIndex((lb) => lb.label === label);
    const noteIndex = labels[findLabelIndex].notes.findIndex(
      (n) => n.id === id
    );

    if (noteIndex >= 0) {
      labels[findLabelIndex].notes[noteIndex].checked =
        !labels[findLabelIndex].notes[noteIndex].checked;
    } else {
      labels[findLabelIndex].notes.push({ id, checked: true, pinned });
    }

    const response = await UserBluePrint.updateOne(
      { email },
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

router.post(`/labels/:label`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const label = req.params.label.split(":")[1].trim();
  const newLabel = req.body.newLabel;
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { labels } = user;

    const newState = [...labels];
    const indexOfLabel = newState.findIndex((l) => l.label.trim() === label);

    newState[indexOfLabel].label = newLabel;
    const response = await UserBluePrint.updateOne(
      { email },
      {
        labels: [...newState],
      }
    );

    res.status(200).json({ message: `Sucessfully edited ${label}` });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/notes/checkboxes/:id`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { pinnedNotes, unPinnedNotes, archivedNotes } = user;
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
      { email },
      archived
        ? { archivedNotes: [...notes], lastTimeDitedNote }
        : pinned
        ? {
            pinnedNotes: [...notes],
            lastTimeDitedNote,
          }
        : { unPinnedNotes: [...notes], lastTimeDitedNote }
    );

    res.status(200).json({ message: "Sucessfully handled checkboxes" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/notes/checkbox/:id`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { pinnedNotes, unPinnedNotes, archivedNotes } = user;
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
      { email },
      archived
        ? { archivedNotes: [...notes], lastTimeDitedNote }
        : pinned
        ? {
            pinnedNotes: [...notes],
            lastTimeDitedNote,
          }
        : { unPinnedNotes: [...notes], lastTimeDitedNote }
    );

    res.status(200).json({ message: "Sucessfully handled checkbox" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/notes/archivenote/:id", async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const { id, isNotePined: pinned } = getIdPinnedStatus(req);

  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { unPinnedNotes, pinnedNotes, archivedNotes } = user;
    const notes = pinned ? pinnedNotes : unPinnedNotes;
    const note = notes.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { email },
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

router.post("/notes/unarchivenote/:id", async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const { id } = getIdPinnedStatus(req);

  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { unPinnedNotes, archivedNotes } = user;
    const notes = archivedNotes;
    const note = notes.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { email },
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

router.post(`/avatar`, async (req, res) => {
  const email = req.user;
  const { userDocument } = req;

  const { avatar } = req.body;

  try {
    const response = await UserBluePrint.updateOne(
      { email },
      {
        image: avatar,
      }
    ).exec();

    res.status(200).json({ message: "Archived note successfully" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});
router.post(`/pwd`, async (req, res) => {
  const email = req.user;
  const { userDocument } = req;

  const { password } = req.body;
  const response = await UserBluePrint.findOne({ email }).exec();
  const match = await bcrypt.compare(password, response.password);
  try {
    res.status(200).json({ match });

    return [response, null];
  } catch (error) {
    return [null, error];
  }
});
router.post(`/npwd`, async (req, res) => {
  const email = req.user;
  const { userDocument } = req;

  const { password } = req.body;
  try {
    const newHashedPwd = await bcrypt.hash(password, 10);
    const response = await UserBluePrint.updateOne(
      { email },
      { password: newHashedPwd }
    );

    res.status(200).json({ response });

    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

/**
 * DELETE REQUESTS
 */

router.delete("/trashbin/:id", async (req, res, next) => {
  const email = req.user;
  const id = req.params.id.split(":")[1];

  try {
    const response = await UserBluePrint.updateOne(
      { email: email },
      { $pull: { deletedNotes: { id: id } } }
    );
    if (response.modifiedCount === 0) {
      return res.status(404).json({ message: "Note not found in trashbin." });
    }
    res
      .status(200)
      .json({ message: "Note permanently deleted from trashbin." });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.delete("/notes/:id", async (req, res, next) => {
  const email = req.user;

  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);

  console.log(pinned, archived);
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { deletedNotes, unPinnedNotes, pinnedNotes, archivedNotes } = user;
    const prevState = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
    console.log({ user });
    const note = prevState.find((n) => n.id === id);

    const response = await UserBluePrint.updateOne(
      { email },
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

router.delete(`/notes/labels/:label`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  const label = req.params.label.split(":")[1];
  try {
    const user = await UserBluePrint.findOne({ email }).exec();
    const { labels } = user;

    const response = await UserBluePrint.updateOne(
      { email },
      { labels: [...labels.filter((l) => l.label !== label)] }
    );

    res.status(200).json({ message: "Sucessfully deleted label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.get(`/account`, async (req, res, next) => {
  const email = req.user;
  const { userDocument } = req;

  try {
    const response = await UserBluePrint.findOneAndDelete({ email });
    res.status(200).json({ message: "Sucessfully deleted account" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
