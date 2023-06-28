import * as dotenv from "../env.js";
import jwt from "jsonwebtoken";

export const veirfyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "UNATHORIZED" });
  }

  jwt.verify(token, process.env.ACCCESS_TOKEN_SECRET, (err, decodedInfo) => {
    if (err) {
      return res.status(401).json({ message: "UNATHORIZED" });
    }

    const { user } = decodedInfo;

    req.user = user;
    return next();
  });

  // console.log("In the middleware End");
};
