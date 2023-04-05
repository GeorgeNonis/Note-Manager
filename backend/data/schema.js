import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: Number,
  passowrd: Number,
  email: String,
  unPinnedNotes: { type: Array, default: [] },
  pinnedNotes: { type: Array, default: [] },
  deletedNotes: { type: Array, default: [] },
  labels: { type: Array, default: [] },
});

export default mongoose.model("User", userSchema);
