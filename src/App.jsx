// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Platter from "./pages/platter";
import Checkout from "./pages/checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        <Route path="/:platterType" element={<Platter />} />
      </Routes>
    </Router>
  );
}

export default App;
