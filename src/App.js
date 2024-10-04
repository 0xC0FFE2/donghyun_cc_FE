import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Adjust the path if necessary
import Home from './pages/Home';            // Adjust the path if necessary
import Articles from './pages/Articles';      // Adjust the path if necessary
import Post from './pages/Posts'
import Editor from './pages/Editor'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/editor/:postId" element={<Editor />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;