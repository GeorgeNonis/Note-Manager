import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: Number,
  passowrd: Number,
  email: String,
  notes: [],
  pinnedNotes: [],
  deletedNotes: [],
});

export const userBluePrint = mongoose.model("User", userSchema);
