export default function BookingPage() {
	return (
		<div className='p-5'>
			<div className='bg-[#FBFCFD] rounded-lg px-6 py-4 flex items-center gap-2 w-full mb-6'>
				<h2 className='font-bold text-xl mr-2'>Booking</h2>
				<span className='text-gray-500'>|</span>
				<span className='text-gray-500 ml-2 pr-2'>
					<p className='inline pr-1'>
						Hotels {">"} Hotel Details {">"}
					</p>
					<p className='text-blue-600 inline'>Booking</p>
				</span>
			</div>
			<div className='flex flex-col lg:flex-row gap-8'>
				<div className='flex-1 bg-[#FBFCFD] rounded-lg p-8'>
					<h2 className='text-2xl font-bold mb-1'>Your Details</h2>
					<p className='text-gray-400 text-sm mb-6'>
						Whether you are in town for business or leisure, San Francisco Marriott
						Marquis welcomes travelers to Northern California with exceptional
						service, spacious
					</p>
					<form className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<div>
								<label className='block text-gray-700 mb-1'>Title</label>
								<select className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'>
									<option>Mr</option>
									<option>Mrs</option>
									<option>Ms</option>
								</select>
							</div>
							<div>
								<label className='block text-gray-700 mb-1'>Fast Name</label>
								<input
									className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
									placeholder='John'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-1'>Last Name</label>
								<input
									className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
									placeholder='Enter your last name'
								/>
							</div>
						</div>
						<div>
							<label className='block text-gray-700 mb-1'>Email</label>
							<input
								className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
								placeholder='yourmail@gmail.com'
							/>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-gray-700 mb-1'>Coutry</label>
								<select className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'>
									<option>Egypt</option>
									<option>USA</option>
									<option>UK</option>
								</select>
							</div>
							<div>
								<label className='block text-gray-700 mb-1'>Mobile</label>
								<input
									className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
									placeholder='+20 000 0000 000'
								/>
							</div>
						</div>
						<hr className='my-8 border-gray-200' />
						<h2 className='text-2xl font-bold mb-4'>Payment Details</h2>
						<div>
							<label className='block text-gray-700 mb-1'>Card Number</label>
							<div className='flex items-center'>
								<input
									className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
									placeholder='*** *** *** ***'
								/>
								<div className='flex items-center ml-2 gap-1'>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg'
										alt='visa'
										className='w-8 h-5 object-contain'
									/>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png'
										alt='mc'
										className='w-8 h-5 object-contain'
									/>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/5/5e/American_Express_logo_%282018%29.svg'
										alt='amex'
										className='w-8 h-5 object-contain'
									/>
									<img
										src='https://upload.wikimedia.org/wikipedia/commons/2/2a/Discover_Card_logo.svg'
										alt='discover'
										className='w-8 h-5 object-contain'
									/>
								</div>
							</div>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-gray-700 mb-1'>CVV</label>
								<input
									className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
									placeholder='123'
								/>
							</div>
							<div>
								<label className='block text-gray-700 mb-1'>Expiry Date</label>
								<input
									className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
									placeholder='8/8/2030'
								/>
							</div>
						</div>
						<div>
							<label className='block text-gray-700 mb-1'>Card Holder</label>
							<input
								className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none'
								placeholder='Ahmed Mohamed Ahmed Aly'
							/>
						</div>
						<button
							type='submit'
							className='w-full mt-6 bg-[#0A6ADA] text-white font-bold py-2 rounded-md text-lg hover:bg-blue-700 transition'
						>
							PAY NOW
						</button>
					</form>
				</div>
				<div className='w-full lg:w-[350px] flex-shrink-0 bg-[#FBFCFD] rounded-lg p-6 h-fit shadow-sm'>
					<h2 className='text-2xl font-bold mb-4'>Summary</h2>
					<div className='mb-3'>
						<img
							src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
							alt='hotel'
							className='w-full h-50 object-cover rounded-xl mb-2'
						/>
						<div className='flex items-start justify-between'>
							<div>
								<div className='font-semibold text-base leading-tight mb-1'>
									San Francisco Marriott Marquis ..
								</div>
								<div className='flex items-center gap-1 text-[14px] text-gray-400 mb-1'>
									<span className='text-blue-600'>
										<i class='fa-solid fa-location-dot'></i>
									</span>
									<span>780 Mission Street, San Francisco</span>
								</div>
							</div>
							<div className='text-right'>
								<span className='text-red-600 font-bold text-xs block'>20% OFF</span>
								<span className='flex items-end gap-1 justify-end'>
									<span className='text-gray-900 font-bold text-3xl leading-tight'>
										399
									</span>
									<span className='text-gray-400 text-xs mb-1'>USD</span>
								</span>
								<div className='text-gray-400 text-xs'>Per night</div>
							</div>
						</div>
					</div>
					<div className='mb-2'>
						<p className='block text-gray-700 font-semibold mb-1'>Check In</p>
						<p className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none font-semibold text-gray-800'>
							22 Aug, 2020, Tuesday
						</p>
					</div>
					<div className='mb-2'>
						<p className='block text-gray-700 font-semibold mb-1'>Check Out</p>
						<p className='w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none font-semibold text-gray-800'>
							24 Aug, 2020, Tuesday
						</p>
					</div>
					<div className='flex items-center justify-between text-sm mb-1 mt-8'>
						<span className='text-gray-500'>Price Per Night</span>
						<span className='text-gray-700 font-semibold'>$399</span>
					</div>
					<div className='flex items-center justify-between text-sm mb-1'>
						<span className='text-gray-500'>Nights</span>
						<span className='text-gray-700 font-semibold'>2</span>
					</div>
					<div className='border-t border-gray-200 my-4'></div>
					<div className='flex items-center justify-between text-base font-bold mt-2'>
						<span>Total Price</span>
						<span className='text-[#0A6ADA]'>$798</span>
					</div>
				</div>
			</div>
		</div>
	);
}
