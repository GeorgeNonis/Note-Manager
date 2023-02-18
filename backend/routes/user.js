const express = require("express");
const {
  readData,
  writeData,
  writeDeleted,
  readDataDel,
} = require("../utils/utils");
const router = express.Router();

/**
 * GET REQUESTS
 */
router.get("/", async (req, res, next) => {
  const data = await readData();
  res.status(201).json(data);
});

router.get("/deleted", async (req, res, next) => {
  const data = await readDataDel();
  res.status(201).json(data);
});

/**
 * POST REQUESTS
 */

router.post("/", async (req, res, next) => {
  const data = req.body;
  const prevState = await readData();
  await writeData([...prevState, { ...data }]);
  res.status(201).json({ message: "Succssfully added your Note" });
});

router.post("/sort", async (req, res, next) => {
  const data = req.body;
  const sortFile = req.query.sort;
  if (sortFile) {
    await writeData(data);
    res.status(201).json({ message: "Sorted your items Successfully" });
  } else {
    await writeDeleted(data);
    res.status(201).json({ message: "Sorted your items Successfully" });
  }
});

router.post("/restore", async (req, res, next) => {
  const id = req.body.id;
  const data = await readDataDel();
  const restoredNote = data.find((n) => n.id === id);
  const currentState = await readData();
  try {
    await writeData([...currentState, { ...restoredNote }]);
    res.status(201).json({ message: "Restored successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
});

const test = (arg1) => {
  if (!arg1) arg1 = 10;

  console.log("If statement didnt stop me");
  console.log(arg1);
};

test();

router.post("/remove", async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  console.log("REMOVING");
  const data = await readDataDel();
  try {
    await writeDeleted([...data.filter((n) => n.id !== id)]);
    res.status(201).json({ message: "Successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "Something wnet wrong", error });
  }
});

/**
 * DELETE REQUESTS
 */

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const prevState = await readData();
  const note = prevState.find((n) => n.id === id);
  const prevStateDel = await readDataDel();
  const newState = prevState.filter((n) => n.id != id);

  await writeDeleted([...prevStateDel, note]);
  await writeData([...newState]);
  res.status(200).json({ message: "Deleted note successfully" });
});

module.exports = router;
