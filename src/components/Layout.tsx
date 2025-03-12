import { Link, Outlet } from "react-router";
import { useEffect } from "react";
import { useUserContext } from "../Hooks/ContextHooks";

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, [user, handleAutoLogin]);

  return (
    <>
      <h1 className="neon-text font-bold mb-5">Binterezt</h1>
      <div>
        <nav className="mb-2">
          <ul className="m-0 list-none p-0bg-stone-600 flex justify-center items-center neon-shadow bg-pink-600 text-black rounded-2xl">
            <li>
              <Link
                className="block p-4 text-center hover:bg-red-600 duration-800 ease-in-out hover:text-black bg-pink-600"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center hover:bg-red-600 duration-800 ease-in-out hover:text-black "
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center hover:bg-red-600 duration-800 ease-in-out hover:text-black"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center hover:bg-red-600 duration-800 ease-in-out hover:text-black"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center hover:bg-red-600 duration-800 ease-in-out hover:text-black"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
