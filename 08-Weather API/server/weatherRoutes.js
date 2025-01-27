const express = require("express");
const axios = require("axios");
const { API_KEY, BASE_URL } = require("./config");

const router = express.Router();

router.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const response = await axios.get(
      `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;

    const weatherInfo = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    res.status(200).json(weatherInfo);
  } catch (error) {
    if (error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;
