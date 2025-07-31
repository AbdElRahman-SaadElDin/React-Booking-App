import HotelCard from "../../components/HotelCard/HotelCard";

export default function Profile() {
	return (
		<>
			<div className='p-5'>
				<div className='bg-[#FBFCFD] rounded-lg px-6 py-4 flex items-center gap-2 w-full mb-6'>
					<h2 className='font-bold text-xl mr-2'>My Bookings</h2>
					<span className='text-gray-500'>|</span>
					<span className='text-gray-500 ml-2 pr-2'>
						<p className='text-blue-600 inline'>My Bookings</p>
					</span>
				</div>
				<div className='flex flex-col lg:flex-row gap-8'>
					<div className='flex-1 flex flex-col gap-6'>
						<HotelCard />
						<HotelCard />
						<HotelCard />
					</div>					<div className='w-full lg:w-[340px] max-h-[400px] flex-shrink-0 bg-[#FBFCFD] rounded-lg shadow p-6 flex flex-col items-center'>
						<h2 className='text-xl font-bold mb-4 w-full text-left'>Profile</h2>
						<div className='flex flex-col items-center w-full'>
							<div className='w-28 h-28 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 mb-4 shadow'>
								MH
							</div>
							<div className='text-center'>
								<div className='text-lg font-bold text-gray-800'>John Doe</div>
								<div className='text-gray-400 text-sm mb-3'>Personal Account</div>
								<button className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-semibold shadow-sm transition'>
									Edit Profile
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
