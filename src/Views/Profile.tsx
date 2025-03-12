import { useUserContext } from "../Hooks/ContextHooks";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <>
      {user && (
        <>
          <h2 className="font-bold bg-pink-600 neon-shadow text-black rounded-lg margin-50">
            Profile
          </h2>
          <div className="m-10 bg-purple-700 p-5 rounded-lg">
            <h3 className="neon-text font-bold text-2xl">User information</h3>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>User level: {user.level_name}</p>
            <p>Created: {new Date(user.created_at).toLocaleString("fi-FI")}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
