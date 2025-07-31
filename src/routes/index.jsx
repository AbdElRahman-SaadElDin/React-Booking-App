import { createBrowserRouter, Navigate } from "react-router-dom";
import User from "../layouts/User";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Details from "../pages/Details/Details";
import SearchPage from "../pages/SearchPage/SearchPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFoundPage/NotFound";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLogin);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "details/:id",
        element: <Details />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "booking/:id",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
