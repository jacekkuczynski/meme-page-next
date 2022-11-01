import Image from "next/image";

type UserAvatarProps = { avatarSrc: string };

const UserAvatar = ({ avatarSrc }: UserAvatarProps) => {
  return (
    <Image
      src={avatarSrc}
      alt="user avatar"
      width={20}
      height={20}
      priority={true}
    />
  );
};

export default UserAvatar;
