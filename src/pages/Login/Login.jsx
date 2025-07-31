import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../store/authSlice";
import { hotelSlice } from "../../store/hotelSlice";
import BrandLogo from "../../assets/BrandLogo.png";
import BG from "../../assets/BG.png";

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogin = useSelector((state) => state.auth.isLogin);
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
				alert("Invalid email or password");
			}
		}, 100);
	};

	return (
		<div className='flex min-h-screen w-full'>
			<div className='flex-1 bg-white flex items-center justify-center p-8'>
				<div className='w-full max-w-md flex flex-col items-center gap-8'>
					<div className='mb-4'>
						<img
							src={BrandLogo}
							alt='Bookler'
							className='h-15 w-auto object-contain'
						/>
					</div>

					<h1 className='text-3xl font-bold text-gray-900 text-center m-0'>LOGIN</h1>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full flex flex-col gap-6'
					>
						<div className='w-full'>
							<input
								type='email'
								placeholder='yourmail@gmail.com'
								className={`w-full p-4 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
									errors.email
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								})}
							/>
							{errors.email && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.email.message}
								</span>
							)}
						</div>

						<div className='w-full'>
							<input
								type='password'
								placeholder='Password'
								className={`w-full p-4 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
									errors.password
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("password", {
									required: "Password is required",
									pattern: {
										value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
										message: "Min 6 chars, at least 1 letter & 1 number",
									},
								})}
							/>
							{errors.password && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.password.message}
								</span>
							)}
						</div>

						<button
							type='submit'
							className='w-full p-4 bg-blue-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors duration-300 uppercase hover:bg-blue-600'
						>
							LOGIN
						</button>
					</form>

					<div className='text-center mt-4'>
						<span className='text-gray-500 text-sm'>Don't have an account? </span>
						<Link
							to='/register'
							className='text-blue-500 no-underline font-semibold ml-1 hover:underline'
						>
							Register
						</Link>
					</div>

					<div className='w-full mt-8'>
						<h3 className='text-base font-semibold text-gray-700 text-center mb-4'>
							Login with Others
						</h3>

						<div className='flex flex-col gap-4'>
							<button className='flex items-center justify-center gap-3 w-full p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 text-sm font-medium hover:border-gray-300 hover:bg-gray-50'>
								<div className='w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs'>
									G
								</div>
								<span>Login with google</span>
							</button>

							<button className='flex items-center justify-center gap-3 w-full p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 text-sm font-medium hover:border-gray-300 hover:bg-gray-50'>
								<div className='w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs'>
									f
								</div>
								<span>Login with Facebook</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='flex-1 relative overflow-hidden'>
				<img
					src={BG}
					alt='Travel Background'
					className='w-full h-full object-cover object-center rounded-xl'
				/>
			</div>
		</div>
	);
}
