import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { UserProvider } from "./contexts/UserContext";

import Home from "./Views/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Single from "./Views/Single";
import Profile from "./Views/Profile";
import Upload from "./Views/Upload";
import Login from "./Views/Login";
import Logout from "./Views/Logout";
import Modify from "./Views/Modify";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/modify" element={<Modify />} />

            {/* TODO: add missing routes */}
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
