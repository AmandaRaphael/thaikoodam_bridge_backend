import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String },
  registerDate: { type: Date, default: Date.now },
});

const User = model("users", userSchema);

export default User;
