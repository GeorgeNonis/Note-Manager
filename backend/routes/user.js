import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser } from "../utils/utils.js";
import UserBluePrint from "../data/schema.js";

const router = express.Router();

router.post(`/v1/login`, async (req, res, next) => {
  const { email, pwd } = req.body;
  console.log("Logging process");
  console.log({ email, pwd });

  if (!email || !pwd)
    return (
      res.status(400), json({ message: "Email and Password are required!" })
    );

  const user = await UserBluePrint.findOne({ email }).exec();

  const match = user ? await bcrypt.compare(pwd, user.password) : false;

  try {
    const accessToken = jwt.sign(
      {
        user: user.email,
      },
      process.env.ACCCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // const refreshToken = jwt.sign(
    //   {
    //     user: user.email,
    //   },
    //   process.env.ACCCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );
    // res.cookie("jwt", accessToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true,
    // });
    res.setHeader("Authorization", accessToken);
    res.status(200).json({ match });
    return [match, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

router.get(`/v1/userexist`, async (req, res, next) => {
  const email = req.query.email;
  const allUsers = await UserBluePrint.find({});

  const oneUser = await UserBluePrint.findOne({ email });
  const duplicate = allUsers.some((user) => {
    return user.email.toLowerCase() === email.toLowerCase();
  });

  console.log({ duplicate, email });

  try {
    if (duplicate) {
      console.log("Account with this email exists already");

      return res
        .status(201)
        .json({ message: `Account with this email exist's already` });
    } else {
      console.log("No account associated with this email");
      return res
        .status(200)
        .json({ message: `No account associated with this email` });
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
});

router.post("/v1/signup", async (req, res, next) => {
  console.log("SIGNUP PROCESS");
  const { email, pwd, image } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const allUsers = await UserBluePrint.find({});
  const duplicate = allUsers.some((user) => {
    return user.email.toLowerCase() === email.toLowerCase();
  });
  /**
   * Check for duplicates in Database
   */
  if (duplicate) {
    console.log("Duplicates");
    return res.sendStatus(409);
  }
  console.log({ duplicate, email, pwd, image });
  // return;
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const user = createUser(email, hashedPwd, image);
    const newUser = new UserBluePrint({ ...user });

    const response = await newUser
      .save()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    const accessToken = jwt.sign(
      {
        user: user.email,
      },
      process.env.ACCCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // const refreshToken = jwt.sign(
    //   {
    //     user: user.email,
    //   },
    //   process.env.ACCCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );
    res.setHeader("Authorization", accessToken);
    res.status(200).json(response);
    return [response, null];
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
    return [null, error];
  }
});

export default router;
