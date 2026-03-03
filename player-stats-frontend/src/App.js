import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import WelcomePage from "./components/WelcomePage";
import SportSelector from "./components/SportSelector";
import PlayerStats from "./components/PlayerStats";
import PowerBIEmbed from "./components/PowerBIEmbed";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/sports" element={<SportSelector />} />
          <Route path="/players/:sport" element={<PlayerStats />} />
          <Route
            path="/powerbi"
            element={
              <PowerBIEmbed />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;