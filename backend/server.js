const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(userRoutes);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
