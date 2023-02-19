const express = require("express");
const {
  readData,
  writeData,
  writeDeleted,
  readDataDel,
  writePinned,
  readDataPinned,
} = require("../utils/utils");
const router = express.Router();

/**
 * GET REQUESTS
 */
router.get("/", async (req, res, next) => {
  await Promise.all([readDataPinned(), readData(), readDataDel()]).then(
    (val) => {
      res.status(202).json({
        pinned: [...val[0]],
        unpinned: [...val[1]],
        deleted: [...val[2]],
      });
    }
  );
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
  try {
    await writeData([...prevState, { ...data }]);
    res.status(201).json({ message: "Succssfully added your Note" });
  } catch (error) {
    res.status(500).json({ message: "ERROR", error });
  }
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
  console.log("RESTORING");
  const id = req.body.id;
  const data = await readDataDel();
  const restoredNote = data.find((n) => n.id === id);
  const currentState = await readData();
  try {
    await writeDeleted([...data.filter((n) => n.id !== id)]);
    await writeData([...currentState, { ...restoredNote }]);
    res.status(201).json({ message: "Restored successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
});

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

router.post("/pin", async (req, res, next) => {
  const pinned = await readDataPinned();
  const unpinned = await readData();
  const id = req.body.id;
  const isItPinned = pinned.find((n) => n.id === id);
  const pinNote = unpinned.find((n) => n.id === id);
  if (isItPinned === undefined) {
    try {
      await writePinned([...pinned, { ...pinNote }]);
      await writeData([...unpinned.filter((n) => n.id !== id)]);
      return res.status(201).json({ message: "Successfully pinned" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    try {
      await writePinned([...pinned.filter((n) => n.id !== id)]);
      await writeData([...unpinned, { ...isItPinned }]);
      return res.status(201).json({ message: "Successfully unpinned" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
});

/**
 * DELETE REQUESTS
 */

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id.split(":")[1];
  const pinned = req.query.pinned;
  const prevStateDel = await readDataDel();
  let prevState;
  let note;
  console.log(typeof pinned);
  if (pinned === "false") {
    prevState = await readData();
    note = prevState.find((n) => n.id === id);
    console.log(note);
    console.log("unpinned");
    await writeData([...prevState.filter((n) => n.id != id)]);
  } else {
    console.log("pinned");
    prevState = await readDataPinned();
    note = prevState.find((n) => n.id === id);

    await writePinned([...prevState.filter((n) => n.id != id)]);
  }
  console.log(note);
  await writeDeleted([...prevStateDel, note]);
  res.status(200).json({ message: "Deleted note successfully" });
});

module.exports = router;
