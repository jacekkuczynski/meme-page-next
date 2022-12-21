import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/';

function Profile() {
  const { user, error, isLoading } = useUser();

  if (user && isLoading === false && !error) {
    return (
      <div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    );
  }
  return <div className="hidden" />;
}

export default Profile;
