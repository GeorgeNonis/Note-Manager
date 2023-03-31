import express from "express";
import cors from "cors";
import router from "./routes/notes.js";
import { MongoConect } from "./data/database.js";
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(router);

const PORT = process.env.PORT || 4569;

MongoConect((client) => {
  console.log(client);
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
