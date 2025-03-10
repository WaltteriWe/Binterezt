import {useEffect} from 'react';
import { useUserContext } from '../Hooks/ContextHooks';
import { useNavigate } from 'react-router';


const Logout = () => {
  const {handleLogout} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    navigate('/login'); // Redirect to login page after logout
  }, [handleLogout, navigate]);

  return <h1>Logging out...</h1>;
};

export default Logout;