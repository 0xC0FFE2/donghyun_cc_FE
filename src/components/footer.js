import React from 'react';

function Footer() {
  return (
    <footer className="mt-auto footer-wrap">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center text-sm text-gray-500">
        <p>이 블로그의 모든 콘텐츠는 저작권의 보호를 받습니다</p>
        <div className="flex footer-info">
          <img src="https://nanu.cc/NANU_Brand_Logo/NANU_CLOUD_MAIN.svg" alt="Nanu Cloud" className="h-6 mr-2" />
          <span>HOSTING / SERVICE</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;