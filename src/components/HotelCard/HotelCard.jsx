import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HotelCard({ hotel, isBooked = false }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!hotel) return null;

  const allImages = [hotel.images?.main, ...(hotel.images?.gallery || [])]
    .filter(Boolean)
    .filter((image, index, self) => self.indexOf(image) === index);

  const mainImg =
    allImages[currentImageIndex] ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
  const name = hotel.name || "Hotel Name";
  const address = hotel.address
    ? `${hotel.address.city || ""}${
        hotel.address.city && hotel.address.country ? ", " : ""
      }${hotel.address.country || ""}`
    : "";
  const rating = hotel.rating?.score || null;
  const reviewCount = hotel.rating?.reviewCount || null;
  const discount = hotel.pricing?.[0]?.discount || null;
  const price =
    hotel.pricing?.[0]?.discountedPrice ||
    hotel.pricing?.[0]?.originalPrice ||
    null;
  const currency = hotel.pricing?.[0]?.currency || "USD";
  const amenities = hotel.amenities || [];

  const formatBookingDates = () => {
    if (!hotel.bookingData) return null;

    const { checkIn, checkOut } = hotel.bookingData;
    if (!checkIn || !checkOut) return null;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };

    return {
      from: formatDate(checkIn),
      to: formatDate(checkOut),
    };
  };

  const bookingDates = formatBookingDates();

  const handleViewDetails = () => {
    navigate(`/details/${hotel.id}`);
  };

  const handleBookNow = () => {
    navigate(`/booking/${hotel.id}`);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="flex w-full max-w-[550px] h-[175px] bg-white rounded-[6px] shadow-sm overflow-hidden">
      <div className="w-[210px] h-full flex-shrink-0 relative">
        <img src={mainImg} alt={name} className="w-full h-full object-cover" />

        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={handlePreviousImage}
              className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-[10px] shadow text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-[10px] shadow text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Image counter indicator */}
        {allImages.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between pl-4 pt-4 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[18px] font-bold leading-tight text-gray-800">
              {name}
            </h2>
            <p className="text-gray-500 text-s mt-1">{address}</p>
          </div>
          {rating && (
            <div className="flex items-center bg-[#0A6ADA] text-white px-5 py-2 rounded-l-[14px] rounded-r-none text-base font-bold min-w-[70px] justify-center shadow">
              {rating}
              <i className="pl-2 fa-solid fa-star"></i>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6 mt-2 text-gray-400 text-xs flex-wrap">
          {amenities.slice(0, 3).map((am, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-wrap">
              <div>
                <i
                  className={`pr-4 fa-solid fa-${am
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                ></i>
                <span key={idx} title={am}>
                  {am}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pr-4">
          <div className="flex items-end gap-2">
            {discount && (
              <span className="text-[#FFC727] text-s font-semibold">
                {discount}
              </span>
            )}
            {price && (
              <span className="text-xl font-bold text-gray-800">
                {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency}
                {price}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleViewDetails}
              className="bg-gray-100 text-[#0A6ADA] font-semibold px-2 py-1.5 rounded-lg text-[12px] hover:bg-gray-200 transition"
            >
              View Details
            </button>
            {isBooked ? (
              bookingDates ? (
                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <i className="fa-solid fa-calendar text-gray-400"></i>
                  <span className="font-semibold">From:</span>
                  <span>{bookingDates.from}</span>
                  <span className="text-gray-400">|</span>
                  <span className="font-semibold">To:</span>
                  <span>{bookingDates.to}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <i className="fa-solid fa-calendar text-gray-400"></i>
                  <span className="text-gray-500">Booked</span>
                </div>
              )
            ) : (
              <button
                onClick={handleBookNow}
                className="bg-[#0A6ADA] text-white font-semibold px-2 py-1.5 rounded-lg text-[12px] hover:bg-blue-700 transition"
              >
                BOOK NOW
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
