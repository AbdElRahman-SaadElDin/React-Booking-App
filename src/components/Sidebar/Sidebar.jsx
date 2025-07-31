import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../../store/authSlice";
import SideLogo from "../../assets/SideLogo.png";
import CloudImage from "../../assets/Image.png";

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
}) {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.logedUser);
  const isAuthenticated = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/home") {
      setActiveItem("home");
    } else if (path === "/search") {
      setActiveItem("explore");
    } else if (path === "/profile") {
      setActiveItem("bookings");
    } else {
      setActiveItem("home");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/");
  };

  const handleNavigation = (itemId) => {
    setActiveItem(itemId);
    if (itemId === "home") {
      navigate("/");
    } else if (itemId === "explore") {
      navigate("/search");
    } else if (itemId === "bookings") {
      navigate("/profile");
    }

    if (isMobile) {
      onToggleCollapse();
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: "fas fa-home" },
    ...(isAuthenticated
      ? [{ id: "bookings", label: "My Bookings", icon: "fas fa-user" }]
      : []),
    { id: "explore", label: "Explore", icon: "fas fa-globe" },
    { id: "support", label: "Support", icon: "fas fa-question" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? "w-20" : "w-64"
      } ${isMobile ? "w-64" : ""}`}
      style={{
        background:
          "linear-gradient(141.08deg, #0A69DA 32.24%, #0856C8 115.93%, #0231A5 164.9%)",
      }}
    >
      <div className="flex flex-col h-full sidebar-container">
        <div className="flex items-center justify-between p-4 sm:p-6 flex-shrink-0 sidebar-header">
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center">
              <img
                src={SideLogo}
                alt="Bookler"
                className="h-8 sm:h-10 w-auto"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                onClick={onToggleCollapse}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            )}
            {!isMobile && (
              <button
                onClick={onToggleCollapse}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 sm:px-6 py-4 sidebar-nav">
          <ul className="space-y-2 sm:space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center transition-all duration-200 ${
                    isCollapsed && !isMobile
                      ? "justify-center px-3 py-3 sm:py-4 rounded-lg"
                      : "px-4 sm:px-6 py-3 sm:py-4 rounded-full"
                  } ${
                    activeItem === item.id
                      ? "bg-blue-400 text-white shadow-lg"
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  <i
                    className={`${item.icon} text-base sm:text-lg ${
                      !isCollapsed || isMobile ? "mr-3 sm:mr-4" : ""
                    }`}
                  ></i>
                  {(!isCollapsed || isMobile) && (
                    <span className="font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {(!isCollapsed || isMobile) && (
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48">
            <img
              src={CloudImage}
              alt="Clouds"
              className="w-full h-full object-cover rounded-br-xl"
            />
          </div>
        )}

        {(!isCollapsed || isMobile) && (
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full bg-white text-red-600 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-lg text-center text-sm sm:text-base"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/register"
                className="block w-full bg-white text-red-600 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-lg text-center text-sm sm:text-base"
              >
                Sign UP Now
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
