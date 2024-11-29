import { Router } from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const router = Router();

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    const shortUrlId = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${shortUrlId}`;

    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();
    res.status(201).json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect to shortener URL endpoint
router.get("/:shortUrlId", async (req, res) => {
  const { shortUrlId } = req.params;
  try {
    const urlRecord = await Url.findOne({
      shortUrl: `${process.env.BASE_URL}/${shortUrlId}`,
    });
    if (urlRecord) {
      res.redirect(urlRecord.originalUrl);
    } else {
      res.status(404).json({ error: "Short URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
