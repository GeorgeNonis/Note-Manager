import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import router from "./routes/notes.js";
import { veirfyJWT } from "./routes/middleAuth.js";
import retrieveUser from "./routes/retrieveData.js";
import mongoose from "mongoose";
import * as dotenv from "./env.js";
const app = express();

const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use(user);
app.use("/v1", veirfyJWT, retrieveUser, router);

const PORT = process.env.PORT || 4569;
mongoose

  .connect(process.env.DB_API)
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
