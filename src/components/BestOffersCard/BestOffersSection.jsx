import { useState, useEffect } from "react";
import BestOffersCard from "./BestOffersCard";
import Image from "../../assets/BG.png";
import { axiosInstance } from "../../network/interceptor";

export default function BestOffersSection() {
	const [offersList, setOffersList] = useState([]);

	useEffect(() => {
		const callApi = async () => {
			try {
				const res = await axiosInstance.get(`/best_offer`);
				setOffersList(res?.data || []);
			} catch (err) {
				console.error("Error fetching products:", err);
				setOffersList([]);
			}
		};
		callApi();
	}, []);

	return (
		<div className='w-full px-6 pt-[24px] pb-10'>
			<div className='bg-white rounded-[14px] p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-gray-700 text-2xl font-semibold m-0'>Best Offer</h2>
					<a
						href='#'
						className='text-gray-400 text-sm no-underline transition-colors duration-200 hover:text-gray-500'
					>
						View all
					</a>
				</div>

				<div className='grid grid-cols-3 gap-4'>
					{offersList.map((offer, index) => (
						<BestOffersCard
							key={offer.id || index}
							city={offer.name}
							description={offer.location}
							image={offer.image}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
