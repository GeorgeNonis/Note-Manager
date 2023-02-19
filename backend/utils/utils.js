const fs = require("node:fs/promises");

const path = require("path");

const database = path.join(
  path.dirname(require.main.filename),
  "data",
  "database.json"
);

const databaseDel = path.join(
  path.dirname(require.main.filename),
  "data",
  "deleted.json"
);

const databasePinned = path.join(
  path.dirname(require.main.filename),
  "data",
  "pinnedNotes.json"
);

const readData = async () => {
  const data = await fs.readFile(database, (err, data) => {
    return data;
  });
  return JSON.parse(data);
};

const readDataDel = async () => {
  const data = await fs.readFile(databaseDel, (err, data) => {
    return data;
  });
  return JSON.parse(data);
};

const readDataPinned = async () => {
  const data = await fs.readFile(databasePinned, (err, data) => {
    return data;
  });

  return JSON.parse(data);
};

const writeData = async (data) => {
  await fs.writeFile(database, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

const writeDeleted = async (data) => {
  await fs.writeFile(databaseDel, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

const writePinned = async (data) => {
  await fs.writeFile(databasePinned, JSON.stringify(data), (err) => {
    if (err) return err;
  });
};

exports.readData = readData;
exports.writeData = writeData;
exports.writeDeleted = writeDeleted;
exports.readDataDel = readDataDel;
exports.readDataPinned = readDataPinned;
exports.writePinned = writePinned;
