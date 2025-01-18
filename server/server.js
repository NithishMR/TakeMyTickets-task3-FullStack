const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
  })
);
app.get("/api/stock-data", async (req, res) => {
  try {
    const { symbol = "IBM", interval = "5min" } = req.query;
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=demo`
    );
    res.json(response.data);
    // console.log(response.data); // Fixed logging
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// Listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
