import React from 'react';
import ProfileCard from '../components/ProfileCard';
import CountCard from '../components/Count-card';
import RecentPosts from '../components/RecentPosts';
import CategoryPosts from '../components/CategoryPosts';

function Profile() {
  return (
    <div className="container mx-auto px-4 py-1 pt-12">
      <h2 className="text-2xl font-bold mt-6 mb-6">소개</h2>
      <ProfileCard />
      <CountCard />
      <RecentPosts size='4' />
      <CategoryPosts size='4' mode="AUTO" />
    </div>
  );
}

export default Profile;