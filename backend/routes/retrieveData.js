import UserBluePrint from "../data/schema.js";

const retrieveUser = async (req, res, next) => {
  try {
    const userDocument = await UserBluePrint.findOne({
      email: req.user,
    }).exec();

    if (!userDocument) {
      return res.status(404).json({ message: "User not found." });
    }

    req.userDocument = userDocument;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export default retrieveUser;
