import mongoose from "mongoose";

const { Schema, model } = mongoose;

const profilesSchema = new Schema({
   id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  //   img: govind,
  profile: {
    type: String,
    enum: [
      "vocalist",
      "instrumentalist",
      "lead guitarist",
      "rhythm guitarist",
      " bass guitarist",
      "drummer",
      "guitarist",
    ],
    required: true,
  },
  moreInfo: { type: String },
  phone: { type: String, required: true },
});

const Profiles = model("profiles", profilesSchema)

export default Profiles