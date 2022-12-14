import { UserProfile } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import UserAvatar from '../../UserAvatar/UserAvatar';

interface UserAvatarDropdownI {
  user: UserProfile | undefined;
}

function UserAvatarDropdown({ user }: UserAvatarDropdownI) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<null | HTMLDivElement>(null);
  const avatarRef = useRef<null | HTMLButtonElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      !dropdownRef?.current?.contains(event.target) &&
      !avatarRef?.current?.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <button
        ref={avatarRef}
        onClick={() => {
          setOpen(!open);
        }}
        type="button"
      >
        <UserAvatar avatarSrc="/avatarExample.png" />
      </button>

      <div
        ref={dropdownRef}
        className={`${
          open ? 'block' : ''
        }hidden absolute top-12 right-0 h-fit border w-1/2 bg-white rounded-l-lg`}
      >
        <ul className="flex flex-col justify-center text-black divide-y-2 divide-dashed p-2">
          <Link href="/">
            <li className="dropdown-item">Homepage</li>
          </Link>
          <Link href="/profile">
            <li className="dropdown-item">Profile</li>
          </Link>
          <Link href="/upload">
            <li className="dropdown-item">Post Meme</li>
          </Link>

          {user ? (
            <Link href="/api/auth/logout">
              <li className="dropdown-item">Logout</li>
            </Link>
          ) : (
            <Link href="/api/auth/login">
              <li className="dropdown-item">Sign Up/Login</li>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
}

export default UserAvatarDropdown;
