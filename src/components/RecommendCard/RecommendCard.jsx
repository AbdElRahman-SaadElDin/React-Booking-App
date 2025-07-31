import img from "../../assets/NoImage.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RecommendCard({ hotel }) {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.logedUser);

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

  const formatBookingDates = () => {
    const hotelId = hotel.id || hotel._id;
    if (!isHotelBooked(hotelId)) return null;

    const bookingData = getBookingData(hotelId);
    if (!bookingData || !bookingData.checkIn || !bookingData.checkOut)
      return null;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };

    return {
      from: formatDate(bookingData.checkIn),
      to: formatDate(bookingData.checkOut),
    };
  };

  const hotelId = hotel.id || hotel._id;
  const isBooked = isHotelBooked(hotelId);
  const bookingDates = formatBookingDates();

  return (
    <div className="bg-white rounded-[14px] shadow-lg overflow-hidden w-full max-w-[462px] h-[188px]">
      <div className="relative h-full">
        <div className="absolute left-[24px] top-[24px] drop-shadow-[8px_8px_6px_rgba(0,0,0,0.3)]">
          <img
            loading="lazy"
            src={hotel.images?.main || img}
            alt={hotel.name}
            className="object-cover rounded-[16px] w-[130px] h-[140px] cursor-pointer"
            onClick={() => navigate(`/details/${hotel.id}`)}
          />
        </div>

        <div className="absolute left-[174px] top-[24px] right-[30px]">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-xs uppercase font-normal mb-1">
                HOTEL
              </p>

              <h3 className="text-gray-800 font-bold text-xl mb-2">
                {hotel.name}
              </h3>

              <p className="text-gray-600 mb-4 text-xs">
                {hotel.address?.street}, {hotel.address?.city}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-800 whitespace-nowrap text-xs">
                Coupon: <span className="font-semibold">{hotel.id}</span>
              </p>
              {isBooked ? (
                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <i className="fa-solid fa-calendar text-gray-400"></i>
                  <span className="text-gray-500">Booked</span>
                </div>
              ) : (
                <button
                  className=" bg-[#DF142D0F] text-[#DF142D] font-medium py-2 px-4 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap hover:bg-red-200 hover:scale-110 hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/booking/${hotel.id}`);
                  }}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
