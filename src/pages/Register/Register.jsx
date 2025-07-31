import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSlice } from "../../store/authSlice";
import BrandLogo from "../../assets/BrandLogo.png";
import BG from "../../assets/BG.png";

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: { country: "Egypt" } });

	const onSubmit = (data) => {
		const { confirmPassword, ...userData } = data;
		dispatch(authSlice.actions.register(userData));
		alert("Registration successful! Please login.");
		navigate("/login");
	};

	const password = watch("password", "");

	return (
		<div className='flex min-h-screen w-full h-screen overflow-hidden'>
			<div className='flex-1 bg-white flex items-center justify-center p-6 h-full'>
				<div className='w-full max-w-md flex flex-col items-center gap-6'>
					<div className='mb-3'>
						<img
							src={BrandLogo}
							alt='Bookler'
							className='h-14 w-auto object-contain'
						/>
					</div>

					<h1 className='text-2xl font-bold text-gray-900 text-center m-0'>
						SIGNUP
					</h1>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full flex flex-col gap-5'
					>
						<div className='w-full'>
							<input
								type='text'
								placeholder='user name'
								className={`w-full p-3 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
									errors.name
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("name", { required: "Name is required" })}
							/>
							{errors.name && (
								<span className='text-red-500 text-xs mt-1'>{errors.name.message}</span>
							)}
						</div>

						<div className='w-full'>
							<input
								type='email'
								placeholder='yourmail@gmail.com'
								className={`w-full p-3 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
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
								className={`w-full p-3 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
									errors.password
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("password", {
									required: "Password is required",
									pattern: {
										value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/,
										message: "Min 6 chars, 1 special, 1 capital, 1 number",
									},
								})}
							/>
							{errors.password && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.password.message}
								</span>
							)}
						</div>

						<div className='w-full'>
							<input
								type='password'
								placeholder='Confirm Password'
								className={`w-full p-3 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
									errors.confirmPassword
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("confirmPassword", {
									required: "Confirm Password is required",
									validate: (value) => value === password || "Passwords do not match",
								})}
							/>
							{errors.confirmPassword && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.confirmPassword.message}
								</span>
							)}
						</div>

						<div className='w-full'>
							<select
								className={`w-full p-3 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none bg-white ${
									errors.country
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("country", { required: "Country is required" })}
							>
								<option value='Egypt'>Egypt</option>
								<option value='USA'>USA</option>
								<option value='UK'>UK</option>
								<option value='Canada'>Canada</option>
								<option value='Germany'>Germany</option>
								<option value='France'>France</option>
								<option value='Italy'>Italy</option>
								<option value='Spain'>Spain</option>
								<option value='Australia'>Australia</option>
								<option value='Japan'>Japan</option>
							</select>
							{errors.country && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.country.message}
								</span>
							)}
						</div>

						<div className='w-full'>
							<input
								type='tel'
								placeholder='+20 000 000 0000'
								maxLength={12}
								className={`w-full p-3 border-2 rounded-lg text-base transition-colors duration-300 box-border focus:outline-none placeholder-gray-400 ${
									errors.phone
										? "border-red-500"
										: "border-gray-200 focus:border-blue-500"
								}`}
								{...register("phone", {
									required: "Phone is required",
									pattern: {
										value: /^\d+$/,
										message: "Phone must be numbers only",
									},
									maxLength: {
										value: 12,
										message: "Max length is 12 digits",
									},
								})}
							/>
							{errors.phone && (
								<span className='text-red-500 text-xs mt-1'>
									{errors.phone.message}
								</span>
							)}
						</div>

						<button
							type='submit'
							className='w-full p-3 bg-blue-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors duration-300 uppercase hover:bg-blue-600'
						>
							SIGN UP
						</button>
					</form>

					<div className='text-center mt-3'>
						<span className='text-gray-500 text-sm'>Already have an account? </span>
						<Link
							to='/login'
							className='text-blue-500 no-underline font-semibold ml-1 hover:underline text-sm'
						>
							Login
						</Link>
					</div>

					<div className='w-full mt-6'>
						<h3 className='text-sm font-semibold text-gray-700 text-center mb-3'>
							Signup with Others
						</h3>

						<div className='flex flex-col gap-3'>
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

			<div className='flex-1 relative h-full overflow-hidden'>
				<img
					src={BG}
					alt='Travel Background'
					className='w-full h-full object-cover object-center'
				/>
			</div>
		</div>
	);
}
