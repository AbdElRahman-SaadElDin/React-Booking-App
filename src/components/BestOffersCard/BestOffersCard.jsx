export default function BestOffersCard({
	city = "Alexandria",
	description = "Best Hotel, villa",
	image,
}) {
	return (
		<div className='w-[300px] h-[80px] rounded-[180px] bg-[#7C829B0D] border border-[#ECEDF5] flex items-center gap-3 px-4'>
			<img
				src={image}
				alt={city}
				className='w-[50px] h-[50px] rounded-full object-cover'
				loading='lazy'
			/>
			<div className='flex flex-col'>
				<h3 className='text-[#282E44] font-medium text-[18px]'>{city}</h3>
				<p className='text-[#475073] text-[14px]'>{description}</p>
			</div>
		</div>
	);
}
