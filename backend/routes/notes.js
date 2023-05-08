import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getIdPinnedStatus } from "../utils/utils.js";
import UserBluePrint from "../data/schema.js";
import { veirfyJWT } from "./middleAuth.js";
const router = express.Router();

/**
 * GET REQUESTS
 */

router.get(`/v1/testing`, async (req, res, next) => {
  console.log("Testing");
  res.setHeader(
    "Set-Cookie",
    `email=georgenonis@gmail.com ;SameSite=None; Secure`
  );

  return res.status(200);
});

/**
 *  Signup User or Login User
 */

// router.post(`/v1/login`, async (req, res, next) => {
//   const { email, pwd } = req.body;
//   console.log("Logging process");
//   console.log({ email, pwd });

//   if (!email || !pwd)
//     return (
//       res.status(400), json({ message: "Email and Password are required!" })
//     );

//   const user = await UserBluePrint.findOne({ email }).exec();

//   if (!user.password) return res.sendStatus(401);

//   try {
//     const response = bcrypt.compare(pwd, user.password);
//     const accessToken = jwt.sign(
//       {
//         user: user.email,
//       },
//       process.env.ACCCESS_TOKEN_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );

//     const isTokenValid = jwt.verify(
//       accessToken,
//       process.env.ACCCESS_TOKEN_SECRET
//     );
//     console.log({ isTokenValid });

//     // const NotValidTokenOnPurpose = jwt.verify(
//     //   "12312323213",
//     //   process.env.ACCCESS_TOKEN_SECRET
//     // );
//     // console.log({ NotValidTokenOnPurpose });
//     // const refreshToken = jwt.sign(
//     //   {
//     //     user: user.email,
//     //   },
//     //   process.env.ACCCESS_TOKEN_SECRET,
//     //   {
//     //     expiresIn: "1d",
//     //   }
//     // );
//     res.setHeader("Authorization", accessToken);
//     res.status(200).json({ message: "Correct credentials" });
//     return [response, null];
//     accessToken;
//   } catch (error) {
//     res.status(500).json({ message: "Internal error", error });
//     return [null, error];
//   }
// });

// router.get(`/v1/userexist`, async (req, res, next) => {
//   const email = req.query.email;
//   // console.log({ email });

//   const allUsers = await UserBluePrint.find({});

//   const oneUser = await UserBluePrint.findOne({ email });
//   console.log({ oneUser });
//   console.log(oneUser === null);
//   console.log(typeof oneUser);
//   // console.log({ allUsers });
//   const duplicate = allUsers.some((user) => {
//     // console.log(user.email);
//     return user.email.toLowerCase() === email.toLowerCase();
//   });

//   console.log({ duplicate, email });

//   try {
//     if (duplicate) {
//       console.log("Account with this email exists already");

//       return res
//         .status(201)
//         .json({ message: `Account with this email exist's already` });
//     } else {
//       console.log("No account associated with this email");
//       return res
//         .status(200)
//         .json({ message: `No account associated with this email` });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "something went wrong", error });
//   }
// });

// router.post("/v1/signup", async (req, res, next) => {
//   console.log("SIGNUP PROCESS");
//   const { email, pwd, image } = req.body;

//   if (!email || !pwd) {
//     return res.status(400).json({ message: "Email and Password are required" });
//   }

//   const allUsers = await UserBluePrint.find({});
//   const duplicate = allUsers.some((user) => {
//     return user.email.toLowerCase() === email.toLowerCase();
//   });
//   /**
//    * Check for duplicates in Database
//    */
//   if (duplicate) {
//     console.log("Duplicates");
//     return res.sendStatus(409);
//   }
//   console.log({ duplicate, email, pwd, image });
//   // return;
//   try {
//     const hashedPwd = await bcrypt.hash(pwd, 10);

//     const user = createUser(email, hashedPwd, image);
//     const newUser = new UserBluePrint({ ...user });

//     const response = await newUser
//       .save()
//       .then((res) => console.log(res))
//       .catch((error) => console.log(error));

//     res.status(200).json(response);
//     return [response, null];
//   } catch (error) {
//     res.status(500).json({ message: "Internal error", error });
//     return [null, error];
//   }
// });

/**
 * AUTH VERIFICATION
 */

/**
 * AUTH VERIFICATION
 */

router.get("/v1/notes", async (req, res, next) => {
  const email = req.user;
  console.log({ email });

  try {
    const user = await UserBluePrint.findOne({ email }).exec();
    console.log({ user });
    res.status(200).json({
      ...user,
    });
    return [user, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

// Promise.allSettled

router.get("/v1/trashbin", async (req, res, next) => {
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

router.get("/v1/notes/labels", async (req, res, next) => {
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

router.post("/v1/notes", async (req, res, next) => {
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
    console.log("theres error");
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post("/v1/notes/editnote/:id", async (req, res, next) => {
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

router.post("/v1/notes/sortnotes", async (req, res, next) => {
  const email = req.user;

  const data = req.body;
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

router.post("/v1/trashbin/:id", async (req, res, next) => {
  const email = req.user;

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

router.post("/v1/trashbin", async (req, res, next) => {
  const email = req.user;

  const id = req.body.id;
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { deletedNotes } = data;
    const response = await UserBluePrint.updateOne(
      { email },
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
  const email = req.user;

  try {
    const user = await UserBluePrint.findOne({ email }).exec();
    console.log("pinning note --- backend request from frontned");
    console.log({ user, email });
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

router.post("/v1/notes/colorupdate/:id", async (req, res, next) => {
  const email = req.user;

  const curr = new Date();
  curr.setDate(curr.getDate());
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  console.log({ email });

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

router.post(`/v1/notes/copynote/:id`, async (req, res, next) => {
  const email = req.user;

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

router.post(`/v1/notes/labels/:id`, async (req, res, next) => {
  const email = req.user;

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
    // response.labels = [...labels, { ...newLabel }];

    res.status(200).json({ message: "Sucessfully created label" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.post(`/v1/notes/label/:id`, async (req, res, next) => {
  const email = req.user;

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
      console.log("index exist");
      labels[findLabelIndex].notes[noteIndex].checked =
        !labels[findLabelIndex].notes[noteIndex].checked;
    } else {
      console.log("index doesnt exist");
      labels[findLabelIndex].notes.push({ id, checked: true, pinned });
    }

    // response.labels = [...labels];
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

router.post(`/v1/labels/:label`, async (req, res, next) => {
  const email = req.user;

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
  const email = req.user;

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

router.post(`/v1/notes/checkbox/:id`, async (req, res, next) => {
  const email = req.user;

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

router.post("/v1/notes/archivenote/:id", async (req, res, next) => {
  const email = req.user;
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

router.post("/v1/notes/unarchivenote/:id", async (req, res, next) => {
  const email = req.user;
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

router.post(`/v1/avatar`, async (req, res) => {
  const email = req.user;
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
router.post(`/v1/pwd`, async (req, res) => {
  const email = req.user;
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
router.post(`/v1/npwd`, async (req, res) => {
  const email = req.user;
  // console.log(req);
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

router.delete("/v1/notes/:id", async (req, res, next) => {
  const email = req.user;
  const { id, isNotePined: pinned, archived } = getIdPinnedStatus(req);
  try {
    const user = await UserBluePrint.findOne({ email }).exec();

    const { deletedNotes, unPinnedNotes, pinnedNotes, archivedNotes } = user;
    const prevState = archived
      ? archivedNotes
      : pinned
      ? pinnedNotes
      : unPinnedNotes;
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

router.delete(`/v1/notes/labels/:label`, async (req, res, next) => {
  const email = req.user;
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

router.get(`/v1/account`, async (req, res, next) => {
  const email = req.user;

  console.log("deleting account");
  try {
    const response = await UserBluePrint.findOneAndDelete({ email });
    console.log(Array.isArray);
    console.log({ response });
    res.status(200).json({ message: "Sucessfully deleted account" });
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
