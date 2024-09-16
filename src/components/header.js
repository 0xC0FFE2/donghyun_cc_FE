import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_full_long.png';

function Header() {
  return (
    <header className="fixed bg-white w-full z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="donghyun.cc" className="h-8" />
        </Link>
        <nav>
          <Link to="/" className="mr-4 text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/articles" className="text-gray-600 hover:text-gray-900">Articles</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;