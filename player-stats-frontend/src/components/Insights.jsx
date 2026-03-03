import React from "react";

function Insights({ mean, variance, stdDev }) {
  return (
    <div style={{
      background: "#ffffff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      marginTop: "30px"
    }}>
      <h2>AI Statistical Insights</h2>

      <p><strong>Mean:</strong> {mean}</p>
      <p><strong>Variance:</strong> {variance}</p>
      <p><strong>Standard Deviation:</strong> {stdDev}</p>

      <p style={{ marginTop: "15px", color: "#555" }}>
        The mean represents the average performance level.
        Variance and standard deviation indicate performance consistency.
        Lower standard deviation suggests stable performance,
        while higher deviation suggests fluctuation across matches.
      </p>
    </div>
  );
}

export default Insights;