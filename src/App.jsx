// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChinesePlatter from './pages/chinesePlatter';
import ThaiPlatter from './pages/thaiPlatter';
import IndianPlatter from './pages/indianPlatter';
import Platter from './pages/platter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platter" element={<Platter />} />
        {/* <Route path="/chinese-platter" element={<ChinesePlatter />} />
        <Route path="/thai-platter" element={<ThaiPlatter />} />
        <Route path="/indian-platter" element={<IndianPlatter />} /> */}
      </Routes>
    </Router>
  );
}

export default App;