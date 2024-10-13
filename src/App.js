import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './pages/Home';     
import Articles from './pages/Articles'; 
import ArticleView from './pages/ArticleView'
import Editor from './pages/Editor'
import Footer from './components/Footer'
import FileUploader from './pages/Uploader';

import './index.css'
import AdminArticleManager from './pages/Admin';
function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/uploader' element={<FileUploader />} />
          <Route path="/" element={<Home />} />
          <Route path="/article_list" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleView />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/admin" element={<AdminArticleManager />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;