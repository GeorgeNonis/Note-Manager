import express from "express";
import cors from "cors";
import router from "./routes/notes.js";
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(router);

const PORT = process.env.PORT || 4569;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
// console.log(process.env);

// https://noni.nextjs-shop.com/nodemanager-api
