import HotelCard from "../../components/HotelCard/HotelCard";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchPage() {
	const { hotels } = useOutletContext();
	const [page, setPage] = useState(1);
	const pageSize = 10;
	const totalPages = Math.ceil(hotels.length / pageSize);

	useEffect(() => {
		setPage(1);
	}, [hotels]);

	const pagedHotels = hotels.slice((page - 1) * pageSize, page * pageSize);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		}
	};

	return (
		<div className='p-5'>
			<div className='bg-[#FBFCFD] rounded-lg px-6 py-4 flex items-center gap-2 w-full mb-6'>
				<h2 className='font-bold text-xl mr-2'>Hotels</h2>
				<span className='text-gray-500'>|</span>
				<span className='text-gray-500 ml-2 pr-2'>
					<p className='inline pr-1'>Total</p>
					<p className='text-blue-600 inline'>
						{hotels.length} result{hotels.length !== 1 ? "s" : ""}
					</p>
				</span>
			</div>
			<div className='flex flex-wrap min-w-[1124px] gap-6'>
				{hotels.length === 0 ? (
					<div className='text-gray-500 text-center w-full'>
						No hotels found. Try searching!
					</div>
				) : (
					pagedHotels.map((hotel) => (
						<HotelCard
							key={hotel.id || hotel._id}
							hotel={hotel}
							className='flex-1 min-w-[300px] max-w-[400px]'
						/>
					))
				)}
			</div>
			{hotels.length > pageSize && (
				<div className='flex justify-center items-center gap-2 mt-8'>
					<button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
					>
						Prev
					</button>
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i + 1}
							onClick={() => handlePageChange(i + 1)}
							className={`px-3 py-1 rounded ${
								page === i + 1
									? "bg-blue-600 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{i + 1}
						</button>
					))}
					<button
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages}
						className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
