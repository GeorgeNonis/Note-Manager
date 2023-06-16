import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import user from "./routes/user.js";
import router from "./routes/notes.js";
import { veirfyJWT } from "./routes/middleAuth.js";
import mongoose from "mongoose";
import multer from "multer";
import * as dotenv from "./env.js";
const app = express();

const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });

app.use(user);
app.use(veirfyJWT);
app.use(router);

const PORT = process.env.PORT || 4569;
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
