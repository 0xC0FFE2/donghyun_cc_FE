import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_full_long_clear.png';

function Header() {
  return (
    <header className="fixed bg-black w-full z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="donghyun.cc" className="h-8" />
        </Link>
        <nav>
          <Link to="/article_list" className="text-white">게시물</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;