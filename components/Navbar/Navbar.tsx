import React from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/';
import UserAvatarDropdown from './UserAvatarDropdown/UserAvatarDropdown';
import UserAvatar from '../UserAvatar/UserAvatar';

function Navbar() {
  const { user } = useUser();
  return (
    <div className="sticky z-50 top-0 flex items-center justify-around w-full h-12  bg-black text-white text-sm">
      <Link href="/">
        <div className="font-bold tracking-wide cursor-pointer hover:text-blue-400">
          MEME-PAGE
        </div>
      </Link>
      <div className="flex items-center gap-6">
        {user ? (
          <Link href="/api/auth/logout">
            <div className="hidden sm:block font-medium hover:text-blue-400 cursor-pointer">
              Logout
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <div className="hidden sm:block font-medium hover:text-blue-400 cursor-pointer">
              Sign up/Log in
            </div>
          </Link>
        )}

        <div className="bg-slate-300 rounded-full p-1 ">
          <div className="hidden sm:block">
            <Link href="/profile">
              <UserAvatar avatarSrc="/avatarExample.png" />
            </Link>
          </div>
          <div className="block sm:hidden cursor-pointer">
            <UserAvatarDropdown user={user} />
          </div>
        </div>
        <Link href="/upload">
          <button
            className="hidden sm:flex items-center gap-3 bg-blue-700 rounded-full py-1 px-4 font-semibold"
            type="button"
          >
            <PencilIcon className="h-4 w-4" />
            Post
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
