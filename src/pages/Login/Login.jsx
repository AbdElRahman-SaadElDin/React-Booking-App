import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { authSlice } from "../../store/authSlice";
import { hotelSlice } from "../../store/hotelSlice";
import BrandLogo from "../../assets/BrandLogo.png";
import BG from "../../assets/BG.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(authSlice.actions.login(data));
    setTimeout(() => {
      const logedUser = JSON.parse(localStorage.getItem("logedUser") || "null");
      const isLoginNow = JSON.parse(localStorage.getItem("isLogin") || "false");
      if (isLoginNow && logedUser && logedUser.email === data.email) {
        dispatch(hotelSlice.actions.restoreBookings());
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    }, 100);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <div className="flex-1 bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md flex flex-col items-center gap-6 sm:gap-8">
          <div className="mb-4">
            <img
              src={BrandLogo}
              alt="Bookler"
              className="h-12 sm:h-15 w-auto object-contain"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center m-0">
            LOGIN
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 sm:gap-6"
          >
            <div className="w-full">
              <input
                type="email"
                placeholder="yourmail@gmail.com"
                className={`w-full p-3 sm:p-4 border-2 rounded-lg text-sm sm:text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full p-3 sm:p-4 pr-12 border-2 rounded-lg text-sm sm:text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumber = /\d/.test(value);
                    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                    if (!hasUpperCase)
                      return "Password must contain at least one uppercase letter";
                    if (!hasLowerCase)
                      return "Password must contain at least one lowercase letter";
                    if (!hasNumber)
                      return "Password must contain at least one number";
                    if (!hasSpecialChar)
                      return "Password must contain at least one special character";
                    return true;
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10"
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } text-base sm:text-lg`}
                ></i>
              </button>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-3 sm:p-4 bg-blue-500 text-white border-none rounded-lg text-sm sm:text-base font-semibold cursor-pointer transition-colors duration-300 uppercase hover:bg-blue-600"
            >
              LOGIN
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-gray-500 text-xs sm:text-sm">
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-blue-500 no-underline font-semibold ml-1 hover:underline text-xs sm:text-sm"
            >
              Register
            </Link>
          </div>

          <div className="w-full mt-6 sm:mt-8">
            <h3 className="text-sm sm:text-base font-semibold text-gray-700 text-center mb-4">
              Login with Others
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-3 w-full p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 text-xs sm:text-sm font-medium hover:border-gray-300 hover:bg-gray-50">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <span>Login with google</span>
              </button>

              <button className="flex items-center justify-center gap-3 w-full p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 text-xs sm:text-sm font-medium hover:border-gray-300 hover:bg-gray-50">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  f
                </div>
                <span>Login with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden hidden lg:block">
        <img
          src={BG}
          alt="Travel Background"
          className="w-full h-full object-cover object-center rounded-xl"
        />
      </div>
    </div>
  );
}
