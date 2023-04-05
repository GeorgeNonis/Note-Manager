import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: Number,
  passowrd: Number,
  email: String,
  unPinnedNotes: [],
  pinnedNotes: [],
  deletedNotes: [],
  labels: [],
});

export const userBluePrint = mongoose.model("User", userSchema);
