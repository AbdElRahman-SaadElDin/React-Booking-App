import { useState, useEffect } from "react";
import BestOffersCard from "./BestOffersCard";
import Image from "../../assets/BG.png";
import { axiosInstance } from "../../network/interceptor";
import { Link } from "react-router-dom";

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
    <div className="w-full px-4 sm:px-6 pt-4 sm:pt-[24px] pb-6 sm:pb-10">
      <div className="bg-white rounded-[14px] p-4 sm:p-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-gray-700 text-xl sm:text-2xl font-semibold m-0">
            Best Offer
          </h2>
          <Link
            to="/search"
            className="text-gray-400 text-sm no-underline transition-colors duration-200 hover:text-gray-500"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
