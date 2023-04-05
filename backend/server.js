import express from "express";
import cors from "cors";
import router from "./routes/notes.js";
import mongoose from "mongoose";
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(router);

const PORT = process.env.PORT || 4569;

mongoose
  .connect(
    "mongodb+srv://georgenonis:CnAmtWSronh96a4L@cluster0.o7z8bjc.mongodb.net/notes?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log({ res });
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
