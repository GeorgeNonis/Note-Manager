import UserBluePrint from "../data/schema.js";

const retrieveUser = async (req, res, next) => {
  try {
    // Assuming req.user is the email of the authenticated user
    const userDocument = await UserBluePrint.findOne({
      email: req.user,
    }).exec();

    if (!userDocument) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach the user document to the request object
    req.userDocument = userDocument;

    // Call the next middleware in the stack
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export default retrieveUser;
