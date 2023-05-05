import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  password: String,
  date: String,
  email: String,
  image: String,
  unPinnedNotes: { type: Array, default: [] },
  pinnedNotes: { type: Array, default: [] },
  archivedNotes: { type: Array, default: [] },
  deletedNotes: { type: Array, default: [] },
  labels: { type: Array, default: [] },
});

export default mongoose.model("User", userSchema);
