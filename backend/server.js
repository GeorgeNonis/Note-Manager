import express from "express";
import cors from "cors";
import router from "./routes/user.js";
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(router);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
