import { useUserContext } from "../Hooks/ContextHooks";

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      {user && (
        <>
          <h2 className="font-bold bg-black rounded-lg">Profile</h2>
          <div className="m-10 bg-stone-600 rounded-lg">


          <p >Username: {user.username}</p>
          <p >Email: {user.email}</p>
          <p >User level: {user.level_name}</p>
          <p >Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;