import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
  shortCode: String,
  longUrl: String,
});
//long url convert hoke shortCode ban jayega isliye database ke andar rakhenge

const Url = mongoose.model("shortURL", urlSchema);
export default Url;
