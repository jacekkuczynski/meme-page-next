import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../components/Profile/Profile';

export default withPageAuthRequired(() => (
  <>
    <Navbar />
    <Profile />
  </>
));
