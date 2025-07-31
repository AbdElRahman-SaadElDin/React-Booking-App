import { Link } from "react-router-dom";
import HeaderImage from "../../assets/Header.jpg";

export default function Navbar() {
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
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Navbar content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top section with login/signup */}
          <div className="flex justify-between items-center px-6 py-4">
            {/* Logo/Brand */}
            <div className="flex items-center">
              {/* <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-blue-400">Sky</span>Book
                </h1>
              </div> */}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-white hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Middle section with service icons */}
          <div className="flex-1 flex items-center">
            <div className="flex items-center" style={{ marginLeft: "383px" }}>
              {/* Hotel */}
              <div className="flex flex-col items-center text-white">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                  <i className="fa-solid fa-bed text-xl"></i>
                </div>
                <span className="text-sm font-medium">HOTEL</span>
              </div>

              {/* Villa */}
              <div
                className="flex flex-col items-center text-white"
                style={{ marginLeft: "23px" }}
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                  <i className="fa-solid fa-building-columns text-xl"></i>
                </div>
                <span className="text-sm font-medium">VILLA</span>
              </div>

              {/* Taxi */}
              <div
                className="flex flex-col items-center text-white"
                style={{ marginLeft: "23px" }}
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                  <i className="fa-solid fa-taxi text-xl"></i>
                </div>
                <span className="text-sm font-medium">TAXI</span>
              </div>

              {/* Flights */}
              <div
                className="flex flex-col items-center text-white"
                style={{ marginLeft: "23px" }}
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                  <i className="fa-solid fa-plane-departure text-xl"></i>
                </div>
                <span className="text-sm font-medium">FLIGHTS</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
