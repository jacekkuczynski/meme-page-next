import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../../UserAvatar/UserAvatar";

const UserAvatarDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<null | HTMLDivElement>(null);
  const avatarRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      !dropdownRef?.current?.contains(event.target) &&
      !avatarRef?.current?.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  return (
    <>
      <div
        ref={avatarRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <UserAvatar avatarSrc={"/avatarExample.png"} />
      </div>

      <div
        ref={dropdownRef}
        className={`${
          open ? "block" : ""
        }hidden absolute top-12 right-0 h-fit border w-1/2 bg-white rounded-l-lg`}
      >
        <ul className="flex flex-col justify-center text-black divide-y-2 divide-dashed p-2">
          <li className="dropdown-item">Homepage</li>
          <li className="dropdown-item">Post Meme</li>
          <Link href="/api/auth/login">
            <li className="dropdown-item">Sign Up/Login</li>
          </Link>
          <Link href="/api/auth/logout">
            <li className="dropdown-item">Logout</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default UserAvatarDropdown;
