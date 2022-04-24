import mongoose from "mongoose";

const { Schema, model } = mongoose;

const profilesSchema = new Schema({
   
  id: { type: String },
  name: { type: String },
  //   img: govind,
  profile: { type: String },
  moreInfo: { type: String },
  phone: { type: String }
});

const Profiles = model("profiles", profilesSchema)

export default Profiles