import { useUser } from "@auth0/nextjs-auth0";

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (user && isLoading === false && !error) {
    return (
      <div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    );
  } else {
    return <div className="hidden"></div>;
  }
};

export default Profile;
