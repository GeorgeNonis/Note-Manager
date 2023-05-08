import * as dotenv from "../env.js";
import jwt from "jsonwebtoken";

// console.log(process.env.ACCCESS_TOKEN_SECRET);

export const veirfyJWT = (req, res, next) => {
  console.log("In the middleware Start");

  const token = req.headers["authorization"];
  console.log({ token });
  if (!token) {
    console.log("error");
    return res.status(401).json({ message: "UNATHORIZED" });
  }
  console.log("Here");
  jwt.verify(token, process.env.ACCCESS_TOKEN_SECRET, (err, decodedInfo) => {
    if (err) {
      console.log("not authorized");
      return res.status(401).json({ message: "UNATHORIZED" });
    }
    console.log("authorized");
    const { user, iat, exp } = decodedInfo;
    console.log({ iat, exp });
    req.user = user;
    return next();
  });

  console.log("In the middleware End");
};
