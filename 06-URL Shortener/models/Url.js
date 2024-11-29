import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, require: true },
  shortUrl: { type: String, require: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "30d" },
});

const Url = mongoose.model("Url", UrlSchema);

export default Url;
