const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load dataset
const dataPath = path.join(__dirname, "dataset", "check.json");
const players = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

/* ===========================
   GET PLAYERS BY SPORT
=========================== */
app.get("/api/players", (req, res) => {
  const { sport } = req.query;

  if (!sport) return res.json(players);

  const filtered = players.filter(
    p => p.sport.toLowerCase() === sport.toLowerCase()
  );

  res.json(filtered);
});

/* ===========================
   TREND + STATISTICS API
=========================== */
app.get("/api/trend/:name/:metric", (req, res) => {
  const { name, metric } = req.params;

  const player = players.find(p => p.name === name);
  if (!player) return res.status(404).json({ message: "Player not found" });

  let values = [];

  player.stats.forEach(season => {
    Object.keys(season)
      .filter(key => key.startsWith("game_"))
      .forEach(game => {
        const value = season[game][metric];
        if (typeof value === "number") values.push(value);
      });
  });

  if (values.length === 0)
    return res.json({ values: [] });

  const mean =
    values.reduce((a, b) => a + b, 0) / values.length;

  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;

  const stdDev = Math.sqrt(variance);

  // Linear Regression
  const xValues = values.map((_, i) => i + 1);
  const n = values.length;

  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * values[i], 0);
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope =
    (n * sumXY - sumX * sumY) /
    (n * sumXX - sumX * sumX);

  const intercept =
    (sumY - slope * sumX) / n;
  
  res.json({
    player: player.name,
    values,
    mean: mean.toFixed(2),
    variance: variance.toFixed(2),
    stdDev: stdDev.toFixed(2),
    slope: slope.toFixed(2),
    intercept: intercept.toFixed(2),
    prediction: slope * (values.length + 1) + intercept 
  });
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});