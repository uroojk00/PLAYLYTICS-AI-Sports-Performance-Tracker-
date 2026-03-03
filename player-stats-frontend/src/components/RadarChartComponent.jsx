import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

function RadarChartComponent({ player }) {

  const data = [
    { metric: "Average", value: Number(player.mean) },
    { metric: "Growth", value: Number(player.slope) * 10 },
    { metric: "Stability", value: 100 - Number(player.stdDev) * 5 }
  ];

  return (
    <div style={{ height: 300, marginTop: "40px" }}>
      <h3>Performance Radar</h3>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar dataKey="value" stroke="#4e73df" fill="#4e73df" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChartComponent;