const fs = require("node:fs/promises");

const path = require("path");

const dp = path.join(
  path.dirname(require.main.filename),
  "data",
  "database.json"
);

const delp = path.join(
  path.dirname(require.main.filename),
  "data",
  "deleted.json"
);

const readData = async () => {
  const data = await fs.readFile(dp, (err, data) => {
    return data;
  });
  console.log(data);
  return JSON.parse(data);
};

const readDataDel = async () => {
  const data = await fs.readFile(delp, (err, data) => {
    return data;
  });
  console.log();
  return JSON.parse(data);
};

const writeData = async (data) => {
  await fs.writeFile(dp, JSON.stringify(data), (err) => {
    console.log(err);
  });
};

const writeDeleted = async (data) => {
  await fs.writeFile(delp, JSON.stringify(data), (err) => {
    if (err) return err;
    console.log(err);
  });
};

exports.readData = readData;
exports.writeData = writeData;
exports.writeDeleted = writeDeleted;
exports.readDataDel = readDataDel;
