import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookDetailsPage from "./pages/BookDetailsPage";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "./redux-toolkit/slices/profileSlice";
import axios from "axios";
import Loader from "./components/Loader";
import Error from "./pages/Error";
import { useNavigate } from "react-router-dom";
import { logout } from "./utils/logout";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.profile);

  // Check authentication status on app load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        dispatch(setLoading(true));

        const response = await axios.get("/user");
        if (response.data.success) {
          dispatch(setUser(response.data.data));
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        dispatch(logout(navigate));
      } finally {
        dispatch(setLoading(false));
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to={"/profile"} /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/books/:bookId"
            element={
              <PrivateRoute>
                <BookDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          {/* Error route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
