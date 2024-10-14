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
import ProtectedRoute from './components/ProctedRoute';
import OAuthTokenHandler from './pages/AuthTokenHandler'

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
          <Route path="/oauth_client" element={<OAuthTokenHandler/>} />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminArticleManager />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;