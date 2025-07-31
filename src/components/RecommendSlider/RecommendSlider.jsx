import { useEffect, useState } from "react";
import RecommendCard from "../RecommendCard/RecommendCard";
import { axiosInstance } from "../../network/interceptor";

export default function RecommendSlider() {
	const [recList, setRecList] = useState([]);
	const [scrollIndex, setScrollIndex] = useState(0);
	const CARD_WIDTH = 462 + 24;
	const VISIBLE_CARDS = 2;
	useEffect(() => {
		const callApi = async () => {
			try {
				const res = await axiosInstance.get(`/recommended_hotels`);
				setRecList(res?.data || []);
				console.log(recList);
			} catch (err) {
				setRecList([]);
			}
		};
		callApi();
	}, []);

	useEffect(() => {
		if (recList.length <= VISIBLE_CARDS) return;
		const interval = setInterval(() => {
			setScrollIndex((prev) => prev + 1);
		}, 3000);
		return () => clearInterval(interval);
	}, [recList]);

	const REPEAT_COUNT = 100;
	const repeatedList = Array(REPEAT_COUNT).fill(recList).flat();

	return (
		<>
			<div className='flex justify-between items-center mb-6 mt-8 pt-8 px-6'>
				<h2 className='text-gray-700 text-2xl font-semibold m-0'>
					Recommended Hotels
				</h2>
				<a
					href='#'
					className='text-gray-400 text-sm no-underline transition-colors duration-200 hover:text-gray-500'
				>
					View all
				</a>
			</div>
			<div className='w-full px-6 pt-[24px] pb-10 align-start'>
				<div className='w-full max-w-full overflow-x-hidden'>
					<div className='w-[1100px] overflow-x-hidden'>
						<div
							className='flex gap-6 transition-transform duration-700 ease-in-out pb-2'
							style={{
								width: `${repeatedList.length * CARD_WIDTH}px`,
								transform: `translateX(-${scrollIndex * CARD_WIDTH}px)`,
							}}
						>
							{repeatedList.map((hotel, idx) => (
								<div
									key={(hotel.id || hotel.name) + "-" + idx}
									className='flex-shrink-0'
								>
									<RecommendCard hotel={hotel} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
