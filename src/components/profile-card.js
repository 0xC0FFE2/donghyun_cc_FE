import React from 'react';
import { User, Github } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <div className="p-4 flex flex-col items-center text-center">
        <img className="h-24 w-24 rounded-full mb-4" src="/api/placeholder/150/150" alt="Profile" />
        <h3 className="text-lg font-medium text-gray-900">이동현 LEE DONGHYUN</h3>
        <p className="mt-1 text-sm text-gray-500">NodeJS, Devops Engineer</p>
        <div className="mt-2 flex flex-col space-y-2">
          <a href="mailto:leedonghyun@ncloud.sbs" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
            <User className="w-4 h-4 mr-1" />
            leedonghyun@ncloud.sbs
          </a>
          <a href="https://github.com/hy2n" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
            <Github className="w-4 h-4 mr-1" />
            github.com/hy2n
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
