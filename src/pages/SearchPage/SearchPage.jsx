import HotelCard from "../../components/HotelCard/HotelCard";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SearchPage() {
  const { hotels } = useOutletContext();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(hotels.length / pageSize);
  const loggedUser = useSelector((state) => state.auth.logedUser);

  useEffect(() => {
    setPage(1);
  }, [hotels]);

  const pagedHotels = hotels.slice((page - 1) * pageSize, page * pageSize);

  const getBookedHotelIds = () => {
    if (!loggedUser || !loggedUser.email) return [];
    try {
      const all =
        JSON.parse(localStorage.getItem("userBookedHotelIds") || "{}") || {};
      return all[loggedUser.email] || [];
    } catch {
      return [];
    }
  };

  const getBookingData = (hotelId) => {
    if (!loggedUser || !loggedUser.email) return null;
    try {
      const all =
        JSON.parse(localStorage.getItem("userBookings") || "{}") || {};
      const userBookings = all[loggedUser.email] || [];
      return (
        userBookings.find((booking) => booking.hotelId === hotelId) || null
      );
    } catch {
      return null;
    }
  };

  const isHotelBooked = (hotelId) => {
    const bookedIds = getBookedHotelIds();
    return bookedIds.includes(hotelId);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-5">
      <div className="bg-[#FBFCFD] rounded-lg px-6 py-4 flex items-center gap-2 w-full mb-6">
        <h2 className="font-bold text-xl mr-2">Hotels</h2>
        <span className="text-gray-500">|</span>
        <span className="text-gray-500 ml-2 pr-2">
          <p className="inline pr-1">Total</p>
          <p className="text-blue-600 inline">
            {hotels.length} result{hotels.length !== 1 ? "s" : ""}
          </p>
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {hotels.length === 0 ? (
          <div className="text-gray-500 text-center w-full">
            No hotels found. Try searching!
          </div>
        ) : (
          pagedHotels.map((hotel) => {
            const hotelId = hotel.id || hotel._id;
            const isBooked = isHotelBooked(hotelId);
            const bookingData = isBooked ? getBookingData(hotelId) : null;

            return (
              <HotelCard
                key={hotelId}
                hotel={{
                  ...hotel,
                  bookingData: bookingData,
                }}
                isBooked={isBooked}
                className="flex-1 w-full max-w-[400px]"
              />
            );
          })
        )}
      </div>
      {hotels.length > pageSize && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
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
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
