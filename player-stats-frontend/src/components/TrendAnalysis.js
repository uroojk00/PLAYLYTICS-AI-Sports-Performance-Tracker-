import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function TrendAnalysis({ playersData }) {

  // Combine all players into one dataset
  const maxLength = Math.max(
    ...playersData.map(p => p.values.length)
  );

  const chartData = [];

  for (let i = 0; i < maxLength; i++) {
    let row = { game: i + 1 };

    playersData.forEach(player => {
      row[player.name] = player.values[i] || null;
    });

    chartData.push(row);
  }

  return (
    <div style={{
      background: "white",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      marginTop: "40px"
    }}>
      <h2 style={{ textAlign: "center" }}>
        Performance Comparison
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game" />
          <YAxis />
          <Tooltip />
          <Legend />

          {playersData.map((player, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={player.name}
              stroke={`hsl(${index * 80},70%,50%)`}
              strokeWidth={3}
            />
          ))}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendAnalysis;