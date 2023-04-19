import express from "express";
import cors from "cors";
import router from "./routes/notes.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(router);

const PORT = process.env.PORT || 4569;
console.log(PORT);
console.log(process.env.DB_API);

mongoose
  .connect(process.env.DB_API)
  .then((res) => {
    // console.log({ res });
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
