import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar/Navbar';
import UploadMemeForm from '../components/UploadMemeForm/UploadMemeForm';

export default withPageAuthRequired(({ user }) => {
  const userNickname = user.nickname ? user.nickname : '';
  return (
    <>
      <Navbar />
      <UploadMemeForm userNickname={userNickname} />
    </>
  );
});
