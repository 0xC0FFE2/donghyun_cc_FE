import React from 'react';
import CategoryPosts from '../components/CategoryPosts';

function Profile() {
  return (
    <div className="container mx-auto px-4 py-1 pt-12">
      <CategoryPosts size='16' mode="FULL"/>
    </div>
  );
}

export default Profile;
