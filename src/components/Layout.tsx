import { Link, Outlet } from 'react-router';
import { useEffect } from 'react';
import { useUserContext } from '../Hooks/ContextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, [user, handleAutoLogin]);

  return (
    <>
      <h1 className='neon-text font-bold'>Binterezt</h1>
      <div>
        <nav>
          <ul className='m-0 list-none p-0bg-stone-600 flex justify-center items-center neon-shadow'>
            <li>
              <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out hover:text-amber-600" to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out hover:text-amber-600 " to="/profile">Profile</Link>
                </li>
                <li>
                  <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out hover:text-amber-600" to="/upload">Upload</Link>
                </li>
                <li>
                  <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out hover:text-amber-600" to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out hover:text-amber-600" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;