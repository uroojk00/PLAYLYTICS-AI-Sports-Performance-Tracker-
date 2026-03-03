import React from "react";

function StatsTable({ playersData }) {

  if (!playersData || playersData.length === 0) return null;

  // Sort players by mean (highest first)
  const sortedPlayers = [...playersData].sort(
    (a, b) => Number(b.mean) - Number(a.mean)
  );

  const bestPlayer = sortedPlayers[0];

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        marginTop: "40px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>📊 Statistical Comparison</h2>

      {/* ================= TABLE ================= */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center"
        }}
      >
        <thead>
          <tr style={{ background: "#f0f4ff" }}>
            <th style={{ padding: "10px" }}>Player</th>
            <th>Mean</th>
            <th>Std Dev</th>
            <th>Trend</th>
          </tr>
        </thead>

        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr
              key={player.name}
              style={{
                background:
                  player.name === bestPlayer.name
                    ? "#e6fffa"
                    : "transparent",
                fontWeight:
                  player.name === bestPlayer.name ? "600" : "normal"
              }}
            >
              <td style={{ padding: "10px" }}>
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {player.name}
                {player.name === bestPlayer.name && " 🏆"}
              </td>

              <td>{Number(player.mean).toFixed(2)}</td>

              <td>{Number(player.stdDev).toFixed(2)}</td>

              <td>
                {player.slope > 0
                  ? "📈 Improving"
                  : "📉 Declining"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= LEADERBOARD ================= */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f9fafc",
          borderRadius: "15px"
        }}
      >
        <h3>🏆 Leaderboard</h3>

        {sortedPlayers.map((player, index) => (
          <div
            key={player.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee"
            }}
          >
            <span>
              {index === 0 && "🥇 "}
              {index === 1 && "🥈 "}
              {index === 2 && "🥉 "}
              {player.name}
            </span>

            <span>
              Avg Score: {Number(player.mean).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StatsTable;