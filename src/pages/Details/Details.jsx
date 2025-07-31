import { BiSolidCctv } from "react-icons/bi";
import RecommendSlider from "../../components/RecommendSlider/RecommendSlider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../network/interceptor";

export default function Details() {
	const [hotel, setHotel] = useState();
	const [selectedImage, setSelectedImage] = useState(null);
	const { id } = useParams();

	const callApi = async () => {
		try {
			const res = await axiosInstance.get(`/hotels/${id}`);
			setHotel(res?.data);
			setSelectedImage(
				res?.data?.images?.main || res?.data?.images?.gallery?.[0] || null
			);
		} catch (err) {
			console.error("Error fetching product:", err);
		}
	};

	// Handlers for image navigation and selection
	const handlePrevImage = () => {
		if (!hotel.images) return;
		const allImgs = [hotel.images.main, ...(hotel.images.gallery || [])];
		const uniqueImgs = Array.from(new Set(allImgs));
		const idx = uniqueImgs.indexOf(selectedImage);
		const prevIdx = (idx - 1 + uniqueImgs.length) % uniqueImgs.length;
		setSelectedImage(uniqueImgs[prevIdx]);
	};

	const handleNextImage = () => {
		if (!hotel.images) return;
		const allImgs = [hotel.images.main, ...(hotel.images.gallery || [])];
		const uniqueImgs = Array.from(new Set(allImgs));
		const idx = uniqueImgs.indexOf(selectedImage);
		const nextIdx = (idx + 1) % uniqueImgs.length;
		setSelectedImage(uniqueImgs[nextIdx]);
	};

	const handleSelectImage = (img) => {
		setSelectedImage(img);
	};

	useEffect(() => {
		callApi();
	}, [id]);

	if (!hotel) {
		return <div className='p-8 text-center text-lg'>Loading...</div>;
	}

	return (
		<>
			<div className='p-5'>
				<div className='bg-[#FBFCFD] rounded-lg px-6 py-4 flex items-center gap-2 w-full mb-6'>
					<h2 className='font-bold text-xl mr-2'>Hotel Details</h2>
					<span className='text-gray-500'>|</span>
					<span className='text-gray-500 ml-2 pr-2'>
						<p className='inline pr-1'>Hotels {">"}</p>
						<p className='text-blue-600 inline'>Hotel Details</p>
					</span>
				</div>
				<div className='bg-[#FBFCFD] rounded-lg p-6 flex flex-col md:flex-row gap-8'>
					<div className='flex-1 min-w-[340px]'>
						<h1 className='text-3xl font-bold text-gray-800 mb-4'>{hotel.name}</h1>
						<div className='relative rounded-xl overflow-hidden w-full h-[350px] flex-1'>
							<img
								src={selectedImage}
								alt={hotel.name}
								className='w-full h-full object-cover'
							/>
							<button
								className='absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-[10px] shadow text-gray-500 hover:bg-gray-100 z-10'
								onClick={handlePrevImage}
								aria-label='Previous image'
							>
								<svg
									width='16'
									height='16'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									viewBox='0 0 24 24'
								>
									<path d='M15 19l-7-7 7-7' />
								</svg>
							</button>
							<button
								className='absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-[10px] shadow text-gray-500 hover:bg-gray-100 z-10'
								onClick={handleNextImage}
								aria-label='Next image'
							>
								<svg
									width='16'
									height='16'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									viewBox='0 0 24 24'
								>
									<path d='M9 5l7 7-7 7' />
								</svg>
							</button>
							{hotel.images && (
								<div className='absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-3 z-10 items-end'>
									{Array.from(
										new Set([hotel.images.main, ...(hotel.images.gallery || [])])
									).map((img, i) => (
										<div
											key={i}
											className={
												selectedImage === img
													? "w-32 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center transition-all duration-200"
													: "w-20 h-14 rounded-xl overflow-hidden border-0 bg-white/60 flex items-center justify-center transition-all duration-200 self-end"
											}
											style={{
												filter: selectedImage === img ? "none" : "blur(1px)",
												cursor: "pointer",
											}}
											onClick={() => handleSelectImage(img)}
										>
											<img src={img} alt='' className='w-full h-full object-cover' />
										</div>
									))}
								</div>
							)}
							<div className='absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-xl'></div>
						</div>
					</div>
					<div className='flex-1 flex flex-col gap-4'>
						<div className='flex items-center justify-between'>
							<div>
								<h2 className='text-lg font-semibold text-gray-700 mb-1'>
									Hotel review
								</h2>
								<div className='flex items-center gap-2'>
									<span className='bg-[#012257] text-white px-3 py-1 rounded-lg font-bold text-base flex items-center gap-1'>
										{hotel.rating?.score} <span className='text-xs'>★</span>
									</span>
									<span className='text-gray-400 text-xs ml-2'>
										{hotel.rating?.reviewCount} Review
									</span>
									<span className='text-[#012257] ml-2'>
										{Array(hotel.rating?.maxScore || 5)
											.fill(0)
											.map((_, i) => (
												<span key={i}>★</span>
											))}
									</span>
								</div>
							</div>
							<div className='text-right'>
								{hotel.pricing && hotel.pricing[0]?.discount && (
									<span className='text-red-600 font-bold text-lg block'>
										{hotel.pricing[0].discount}
									</span>
								)}
								{hotel.pricing && (
									<span className='flex items-end gap-1'>
										<span className='text-gray-800 font-bold text-3xl leading-tight'>
											{hotel.pricing[0]?.discountedPrice}
										</span>
										<span className='text-gray-400 text-xs mb-1'>
											{hotel.pricing[0]?.currency}
										</span>
									</span>
								)}
								<div className='text-gray-400 text-xs'>
									{hotel.pricing[0]?.priceUnit}
								</div>
							</div>
						</div>
						{/* About */}
						<div>
							<h3 className='font-semibold text-gray-700 mb-1'>About</h3>
							<p className='text-gray-500 text-sm'>{hotel.description}</p>
							<button className='text-blue-600 text-xs mt-1 hover:underline'>
								Show More{" "}
								<span className='ml-1'>
									<i className='fa-solid fa-angle-down'></i>
								</span>
							</button>
						</div>
						<div className='flex items-center gap-2 text-gray-700 text-sm'>
							<span className='text-blue-600'>📍</span>
							{hotel.address?.street}, {hotel.address?.city}, {hotel.address?.state},{" "}
							{hotel.address?.country}
						</div>
						<div>
							<h3 className='font-semibold text-gray-700 mb-1'>Popular Service</h3>
							<div className='flex gap-6 text-gray-400 text-sm'>
								{hotel.amenities?.map((amenity, idx) => (
									<span className='flex items-center gap-1' key={idx}>
										{amenity === "CCTV Cameras" ? (
											<BiSolidCctv className='text-l' />
										) : (
											<i
												className={`fa-solid fa-${amenity
													.toLowerCase()
													.replace(/\s/g, "-")}`}
											></i>
										)}
										{amenity}
									</span>
								))}
							</div>
						</div>
						<button className='mt-6 bg-[#0A6ADA] text-white font-bold py-2 rounded-md text-lg hover:bg-blue-700 transition'>
							PAY NOW
						</button>
					</div>
				</div>
				<RecommendSlider />
			</div>
		</>
	);
}
