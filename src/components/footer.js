import React from 'react';
import DonghyunLogo from '../assets/logo_full_long.png'; // 로컬 이미지 불러오기

function Footer() {
  return (
    <footer className="bg-gray-300 text-black py-4 w-full border-t-4 border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left side */}
        <div className="flex flex-col items-left text-left">
          <img src={DonghyunLogo} alt="DONGHYUN.CC" className="h-12 mb-2" />
          <p className="text-sm">
            이 블로그의 모든 콘텐츠는 저작권의 보호를 받습니다<br />
            이용약관 및 개인정보처리방침 을 확인하시기 바랍니다
          </p>
        </div>
        {/* Right side */}
        <div className="flex flex-col items-right text-center">
          <img src="https://nanu.cc/NANU_Brand_Logo/NANU_CLOUD_MAIN.svg" alt="NANU CLOUD" className="h-12 mb-2" />
          <p className="text-sm text-right">HOSTING / SERVICE</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
