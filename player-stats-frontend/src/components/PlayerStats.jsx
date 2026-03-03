import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrendAnalysis from "./TrendAnalysis";
import StatsTable from "./StatsTable";
import metricsBySport from "../utils/metricsBySport";
import RadarChartComponent from "./RadarChartComponent";
import CountUp from "react-countup";

function PlayerStats() {
  const { sport } = useParams();

  const [players, setPlayers] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [comparisonData, setComparisonData] = useState([]);
  const [selectedPlayerData, setSelectedPlayerData] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false); // ✅ FIXED LOCATION

  /* ================= FETCH PLAYERS ================= */
  useEffect(() => {
    fetch(`http://localhost:5000/api/players?sport=${sport}`)
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setComparisonData([]);
        setSelectedPlayerData(null);
        setSelectedMetric("");
      });
  }, [sport]);

  /* ================= FETCH TREND DATA ================= */
  const fetchTrend = async (playerName, metric) => {
    const res = await fetch(
      `http://localhost:5000/api/trend/${playerName}/${metric}`
    );
    return await res.json();
  };

  /* ================= AUTO ANALYZE ALL ================= */
  useEffect(() => {
    if (!selectedMetric || players.length === 0) return;

    const autoAnalyze = async () => {
      const results = [];

      for (let player of players) {
        const data = await fetchTrend(player.name, selectedMetric);

        results.push({
          name: player.name,
          values: data.values,
          mean: data.mean,
          variance: data.variance,
          stdDev: data.stdDev,
          slope: data.slope,
          intercept: data.intercept,
          prediction: data.prediction
        });
      }

      setComparisonData(results);
      setSelectedPlayerData(null);
    };

    autoAnalyze();
  }, [selectedMetric, players]);

  /* ================= ANALYZE SINGLE ================= */
  const analyzeSinglePlayer = async (playerName) => {
    setLoadingAnalysis(true);

    const data = await fetchTrend(playerName, selectedMetric);

    setSelectedPlayerData({
      name: playerName,
      values: data.values,
      mean: data.mean,
      variance: data.variance,
      stdDev: data.stdDev,
      slope: data.slope,
      intercept: data.intercept,
      prediction: data.prediction
    });

    setLoadingAnalysis(false);
  };

  /* ================= KPI STYLE ================= */
  const kpiStyle = {
    backdropFilter: "blur(12px)",
    background: "rgba(78,115,223,0.8)",
    color: "white",
    padding: "25px",
    borderRadius: "18px",
    minWidth: "180px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Segoe UI",
        background: "linear-gradient(135deg,#eef2ff,#dbeafe,#f0f9ff)",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        {sport} Performance Dashboard
      </h1>

      {/* ================= METRIC SELECTOR ================= */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          <option value="">Select Metric</option>
          {metricsBySport[sport]?.map(metric => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>

      {/* ================= ALL PLAYERS ================= */}
      {comparisonData.length > 0 && (
        <>
          <TrendAnalysis playersData={comparisonData} />
          <StatsTable playersData={comparisonData} />
        </>
      )}

      {/* ================= PLAYER CARDS ================= */}
      {comparisonData.length > 0 && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2>Select Player for Detailed Analysis</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              marginTop: "30px"
            }}
          >
            {players.map(player => {
              const playerStats = comparisonData.find(
                p => p.name === player.name
              );

              const rating = playerStats
                ? (
                    Number(playerStats.mean) * 0.6 +
                    Number(playerStats.slope) * 0.4
                  ).toFixed(2)
                : null;

              return (
                <div
                  key={player.name}
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    width: "220px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "0.3s"
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "#4e73df",
                      margin: "0 auto 10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "30px"
                    }}
                  >
                    {player.name.charAt(0)}
                  </div>

                  <h3>{player.name}</h3>
                  {rating && <p>⭐ Rating: {rating}/10</p>}

                  <button
                    className="button-primary"
                    onClick={() =>
                      analyzeSinglePlayer(player.name)
                    }
                  >
                    View Analysis
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loadingAnalysis && (
        <div
          style={{
            marginTop: "40px",
            padding: "40px",
            borderRadius: "20px",
            background: "#f4f7ff",
            textAlign: "center"
          }}
        >
          <h3>Analyzing Performance...</h3>
        </div>
      )}

      {/* ================= AI DETAILED ANALYSIS ================= */}
      {selectedPlayerData && (
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            marginTop: "50px",
            padding: "40px",
            borderRadius: "25px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
          }}
        >
          <h2>
            🤖 AI Performance Analysis: {selectedPlayerData.name}
          </h2>

          {/* KPI CARDS */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "25px",
              marginBottom: "25px",
              flexWrap: "wrap"
            }}
          >
            <div style={kpiStyle}>
              <h4>Average</h4>
              <h2>
                <CountUp end={Number(selectedPlayerData.mean)} decimals={2} />
              </h2>
            </div>

            <div style={kpiStyle}>
              <h4>Std Dev</h4>
              <h2>
                <CountUp end={Number(selectedPlayerData.stdDev)} decimals={2} />
              </h2>
            </div>

            <div style={kpiStyle}>
              <h4>Prediction</h4>
              <h2>
                <CountUp end={Number(selectedPlayerData.prediction)} decimals={2} />
              </h2>
            </div>
          </div>

          <p>
            <strong>🎯 Confidence Level:</strong>{" "}
            {(100 - Number(selectedPlayerData.stdDev) * 2).toFixed(0)}%
          </p>

          <RadarChartComponent player={selectedPlayerData} />
        </div>
      )}
    </div>
  );
}

export default PlayerStats;