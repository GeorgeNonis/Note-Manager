import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises";
import path from "path";
import process from "process";

const database = path.join(
  path.dirname(process.argv[1]),
  "data",
  "database.json"
);

const databaseDel = path.join(
  path.dirname(process.argv[1]),
  "data",
  "deleted.json"
);

const databasePinned = path.join(
  path.dirname(process.argv[1]),
  "data",
  "pinnedNotes.json"
);

const databaseLabels = path.join(
  path.dirname(process.argv[1]),
  "data",
  "labels.json"
);

export const readData = async () => {
  const data = await fs.readFile(database, (err, data) => {
    if (err) return err;
    return data;
  });
  return JSON.parse(data);
};

export const readDataDel = async () => {
  const data = await fs.readFile(databaseDel, (err, data) => {
    if (err) return err;
    return data;
  });
  return JSON.parse(data);
};

export const readDataPinned = async () => {
  const data = await fs.readFile(databasePinned, (err, data) => {
    if (err) return err;
    return data;
  });

  return JSON.parse(data);
};

export const readDataLabels = async () => {
  const data = await fs.readFile(databaseLabels, (err, data) => {
    if (err) return err;
    return data;
  });

  return JSON.parse(data);
};

export const writeDataLabels = async (data) => {
  return await fs.writeFile(databaseLabels, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

export const writeData = async (data) => {
  return await fs.writeFile(database, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

export const writeDeleted = async (data) => {
  return await fs.writeFile(databaseDel, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

export const writePinned = async (data) => {
  return await fs.writeFile(databasePinned, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

export const getIdPinnedStatus = (req) => {
  const archived = req.query.isarchived
    ? req.query.isarchived === "true"
    : undefined;
  const pinned = req.query.isnotepined;
  const id = req.params.id.split(":")[1];
  const isNotePined = pinned === "true";
  return {
    isNotePined,
    id,
    archived,
  };
};

export const getAllNotes = async () => {
  const pinnedNotes = await readDataPinned();
  const unPinnedNotes = await readData();

  return { pinnedNotes, unPinnedNotes };
};

export const findNote = (arr, id) => {
  const note = arr.find((n) => n.id === id);
  return note;
};

export const findNoteIndex = (arr, id) => {
  const index = arr.findIndex((n) => n.id === id);
  return index;
};

export const createUser = (email, hashedPwd, image) => {
  const curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substring(0, 10);
  const lastTimeDitedNote = curr.toISOString().substring(0, 10);

  const user = {
    userId: uuidv4(),
    email,
    password: hashedPwd,
    date,
    lastTimeDitedNote,
    image,
    notes: [],
    deletedNotes: [],
    pinnedNotes: [],
    archivedNotes: [],
    labels: [],
  };
  return user;
};
