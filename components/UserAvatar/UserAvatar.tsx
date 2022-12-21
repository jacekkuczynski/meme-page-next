import React from 'react';
import Image from 'next/image';

type UserAvatarProps = { avatarSrc: string };

function UserAvatar({ avatarSrc }: UserAvatarProps) {
  return (
    <Image src={avatarSrc} alt="user avatar" width={20} height={20} priority />
  );
}

export default UserAvatar;
