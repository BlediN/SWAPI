import React, { useState } from "react";
import DiscoverButton from "./components/DiscoverButton";
import PlanetCard from "./components/PlanetCard";
import BanList from "./components/BanList";
import "./App.css";

function App() {
  // const [banned, setBanned] = useState([]);
  const [banned, setBanned] = useState({
  climate: [],
  terrain: [],
  population: [],
});
  const [planet, setPlanet] = useState(null);
  
  // const handleDiscover = async () => {
  //   try {
  //     const res = await fetch("https://swapi.py4e.com/api/planets/");
  //     const data = await res.json();
  //     const planets = data.results;

  //     // Pick a random one
  //     const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
  //     setPlanet(randomPlanet);
  //   } catch (err) {
  //     console.error("Error fetching planets:", err);
  //   }
  // };

  const handleDiscover = async () => {
  try {
    const res = await fetch("https://swapi.py4e.com/api/planets/");
    const data = await res.json();
    const planets = data.results;

    const filtered = planets.filter((p) => !isBanned(p));
    if (filtered.length === 0) {
      setPlanet(null);
      return;
    }

    const randomPlanet = filtered[Math.floor(Math.random() * filtered.length)];
    setPlanet(randomPlanet);
  } catch (err) {
    console.error("Error fetching planets:", err);
  }
};

  // const handleBan = () => {
  //   if (planet) {
  //     setBanned([...banned, planet]);
  //     setPlanet(null);
  //   }
  // };

  const handleBan = (type, value) => {
  setBanned((prev) => {
    if (prev[type]?.includes(value)) return prev; // avoid duplicates

    return {
      ...prev,
      [type]: [...prev[type], value],
    };
  });
};

const isBanned = (planet) => {
  return Object.entries(banned).some(([key, values]) => {
    return values.includes(planet[key]);
  });
};

  // const handleRemoveBan = (name) => {
  //   setBanned(banned.filter((p) => p.name !== name));
  // };
const handleRemoveBan = (type, value) => {
  setBanned((prev) => ({
    ...prev,
    [type]: prev[type].filter((v) => v !== value),
  }));
};
  

  return (
    <div className="app">
      <h1>🌌 Stumble Upon Planets</h1>
      <div className="left-panel">
        <DiscoverButton onClick={handleDiscover} />
      </div>
      <div className="right-panel">
        {planet && <PlanetCard planet={planet} onBan={handleBan} />}
      </div>
      <div className="footer-panel">
        <BanList bans={banned} onRemove={handleRemoveBan} />
      </div>
    </div>
  );
}

export default App;
