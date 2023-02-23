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

export const writeData = async (data) => {
  return await fs.writeFile(database, JSON.stringify(data), (err) => {
    if (err) return err;
  });
  // try {
  //   const response = await fs.writeFile(
  //     database,
  //     JSON.stringify(data),
  //     (err) => {
  //       if (err) return err;
  //     }
  //   );
  //   console.log(`Write data ${response}`);
  //   return [response, null];
  // } catch (error) {
  //   console.log("below");
  //   return [null, error];
  // }
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

// export {
//   writePinned,
//   writeData,
//   writeDeleted,
//   readData,
//   readDataDel,
//   readDataPinned,
// };
