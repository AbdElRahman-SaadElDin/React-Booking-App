import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderImage from "../../assets/Header.jpg";

export default function Navbar({ onMobileMenuToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.logedUser);
  const isAuthenticated = localStorage.getItem("isLogin") === "true";
  const isHomePage = location.pathname === "/";
  const isHotelActive = !isHomePage;

  const handleHotelClick = () => {
    navigate("/search");
  };

  return (
    <>
      <nav
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeaderImage})`,
          height: "325px",
          minHeight: "325px",
          maxHeight: "325px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-center px-4 sm:px-6 py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden text-white hover:text-gray-200 transition-colors duration-200"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>

            <div className="flex items-center"></div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2 bg-white bg-opacity-10 backdrop-blur-sm text-white px-2 sm:px-4 py-2 rounded-full transition-all duration-200 hover:bg-opacity-20"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user text-xs sm:text-sm"></i>
                  </div>
                  <span className="text-xs sm:text-sm font-medium hidden sm:block">
                    {loggedUser?.name
                      ? loggedUser.name.split(" ").slice(0, 2).join(" ")
                      : loggedUser?.email || "User"}
                  </span>
                  <i className="fa-solid fa-chevron-down text-xs hidden sm:block"></i>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Middle section with service icons */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-6 px-4">
              {/* Hotel */}
              <div
                className="flex flex-col items-center text-white cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={handleHotelClick}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 transition-all duration-200 hover:shadow-lg ${
                    isHotelActive
                      ? "bg-[#0A6ADA] shadow-lg"
                      : "bg-white bg-opacity-20 hover:bg-opacity-30"
                  }`}
                >
                  <i
                    className={`fa-solid fa-bed text-lg sm:text-xl ${
                      isHotelActive ? "text-white" : "text-white"
                    }`}
                  ></i>
                </div>
                <span className="text-xs sm:text-sm font-medium">HOTEL</span>
              </div>

              {/* Villa */}
              <div className="flex flex-col items-center text-white cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center mb-2 transition-all duration-200 hover:shadow-lg">
                  <i className="fa-solid fa-building-columns text-lg sm:text-xl"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium">VILLA</span>
              </div>

              {/* Taxi */}
              <div className="flex flex-col items-center text-white cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center mb-2 transition-all duration-200 hover:shadow-lg">
                  <i className="fa-solid fa-taxi text-lg sm:text-xl"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium">TAXI</span>
              </div>

              {/* Flights */}
              <div className="flex flex-col items-center text-white cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center mb-2 transition-all duration-200 hover:shadow-lg">
                  <i className="fa-solid fa-plane-departure text-lg sm:text-xl"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium">FLIGHTS</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
