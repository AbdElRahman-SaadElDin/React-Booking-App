import HotelCard from "../../components/HotelCard/HotelCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../network/interceptor";

export default function Profile() {
  const loggedUser = useSelector((state) => state.auth.logedUser);
  const [bookedHotels, setBookedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateInitials = (name) => {
    if (!name) return "U";

    const nameParts = name
      .trim()
      .split(" ")
      .filter((part) => part.length > 0);

    if (nameParts.length === 0) return "U";

    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    } else {
      const firstTwoNames = nameParts.slice(0, 2);
      return firstTwoNames.map((name) => name.charAt(0).toUpperCase()).join("");
    }
  };

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

  const fetchHotelData = async (hotelId) => {
    try {
      const response = await axiosInstance.get(`/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hotel ${hotelId}:`, error);
      return null;
    }
  };

  const loadBookedHotels = async () => {
    setLoading(true);
    try {
      const bookedHotelIds = getBookedHotelIds();
      const hotelPromises = bookedHotelIds.map((id) => fetchHotelData(id));
      const hotels = await Promise.all(hotelPromises);
      const validHotels = hotels.filter((hotel) => hotel !== null);

      const hotelsWithBookings = validHotels.map((hotel) => ({
        ...hotel,
        bookingData: getBookingData(hotel.id),
      }));

      setBookedHotels(hotelsWithBookings);
    } catch (error) {
      console.error("Error loading booked hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedUser && loggedUser.email) {
      loadBookedHotels();
    }
  }, [loggedUser]);

  const userInitials = generateInitials(loggedUser.name);

  return (
    <>
      <div className="p-3 sm:p-5">
        <div className="bg-[#FBFCFD] rounded-lg px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 w-full mb-4 sm:mb-6">
          <h2 className="font-bold text-lg sm:text-xl mr-2">My Bookings</h2>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-gray-500 sm:ml-2 pr-2">
            <p className="text-blue-600 inline">My Bookings</p>
          </span>
        </div>
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">
                  Loading your bookings...
                </span>
              </div>
            ) : bookedHotels.length > 0 ? (
              bookedHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} isBooked={true} />
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="text-gray-400 text-4xl sm:text-6xl mb-4">
                    🏨
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                    No Bookings Yet
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    You haven't made any hotel bookings yet.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full xl:w-[340px] max-h-[400px] flex-shrink-0 bg-[#FBFCFD] rounded-lg shadow p-4 sm:p-6 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-bold mb-4 w-full text-left">
              Profile
            </h2>
            <div className="flex flex-col items-center w-full">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center text-2xl sm:text-4xl font-bold text-blue-600 mb-4 shadow">
                {userInitials}
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg font-bold text-gray-800 truncate">
                  {loggedUser.name || "User"}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm mb-3">
                  Personal Account
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-5 py-2 rounded-full font-semibold shadow-sm transition text-sm">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
