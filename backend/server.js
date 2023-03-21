import express from "express";
import cors from "cors";
import router from "./routes/notes.js";
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(router);

app.listen(4569, () => {
  console.log("App is running on port 8080");
});

// https://noni.nextjs-shop.com/nodemanager-api
