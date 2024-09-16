import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Adjust the path if necessary
import Home from './pages/Home';            // Adjust the path if necessary
import Articles from './pages/Articles';      // Adjust the path if necessary

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Articles" element={<Articles />} />
      </Routes>
    </Router>
  );
}

export default App;
