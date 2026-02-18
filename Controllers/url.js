import Url from "../Models/Url.js";
import shortid from "shortid";

//yahan pe data request.body ke through aayega
export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:3000/${shortCode}`;

  const newUrl = new Url({ shortCode, longUrl });
  //database mai store karenge ek longUrl ke respect mai konsa shortCode hai
  await newUrl.save();

  console.log("short saved = ", newUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  // url ke code ko lene ke liye request mai se params lenge
  const shortCode = req.params.shortCode;
  // ab is short code ke respective long url ko database mai find karna hai and usko return kar dena hai
  const originalUrl = await Url.findOne({ shortCode });

  // agar originalUrl mil gaya tp=oh uspe redirect kar denge
  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid shortcode" });
  }
};
