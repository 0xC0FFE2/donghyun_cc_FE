import profileImage from '../assets/profile.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router를 사용한다고 가정

function ProfileCard() {
  const [clickStart, setClickStart] = useState(null);
  const navigate = useNavigate();

  const handleMouseDown = () => {
    setClickStart(Date.now());
  };

  const handleMouseUp = () => {
    if (clickStart && Date.now() - clickStart >= 3000) {
      navigate('/admin');
    }
    setClickStart(null);
  };

  return (
    <>
      <div className="bg-white flex items-center">
        <img
          src={profileImage}
          alt="이동현"
          className="w-24 h-24 rounded-md mr-4 cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setClickStart(null)}
        />
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">NodeJS, Spring, DevOps Engineer</p>
          <h1 className="text-3xl font-bold text-gray-900">
            이동현{' '}
            <span className="hidden sm:inline font-normal text-gray-400">
              LEE DONGHYUN
            </span>
          </h1>
          <div className="flex space-x-2 mt-2">
            <a
              href="https://me.donghyun.cc"
              className="bg-blue-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
            >
              Portfolio
            </a>
            <a
              href="mailto:leedonghyun@ncloud.sbs"
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
            >
              leedonghyun@ncloud.sbs
            </a>
            <a
              href="https://github.com/0xC0FFE2"
              className="hidden sm:inline bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
            >
              github.com/0xC0FFE2
            </a>
          </div>
        </div>
      </div>
      <p className="mt-4 text-left text-black-600">
        새로움과 편리함을 추구하는 서버 개발자 이동현 입니다!
      </p>
    </>
  );
}

export default ProfileCard;
