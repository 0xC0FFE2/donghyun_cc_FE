import React from 'react';
import main_logo_image from '../assets/logo_full_long.png'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
        <img src={main_logo_image} alt='DONGHYUN.CC' className='top-header-img'></img>
        <nav>
          <a href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2">
            <button>전체 글</button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
