import React from 'react';
import DonghyunLogo from '../assets/logo_full_long_clear.png'; // 로컬 이미지 불러오기

function Footer() {
  return (
    <footer className="bg-white text-black py-6 w-full rounded-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-start text-left">
          <img src={DonghyunLogo} alt="DONGHYUN.CC" className="h-10 mb-3" />
          <p className="text-sm mb-2">
            이 블로그의 모든 콘텐츠는 저작권의 보호를 받습니다
          </p>
          <p className="text-sm">
            이용약관 및 개인정보처리방침 을 확인하시기 바랍니다
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
