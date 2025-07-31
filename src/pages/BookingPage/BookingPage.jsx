import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { hotelSlice } from "../../store/hotelSlice";
import toast from "react-hot-toast";
import { axiosInstance } from "../../network/interceptor";
import SuccessPay from "../../components/SuccessPay/SuccessPay";

export default function BookingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.logedUser);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const today = new Date().toISOString().split("T")[0];

  const calculateMinCheckOut = () => {
    if (!checkIn) return today;
    const checkInDate = new Date(checkIn);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(checkInDate.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  const minCheckOut = calculateMinCheckOut();

  useEffect(() => {
    if (checkOut && checkOut < minCheckOut) {
      setCheckOut("");
    }
  }, [checkIn, checkOut, minCheckOut]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const pricePerNight = hotel?.pricing?.[0]?.discountedPrice || 399;
  const totalPrice = nights * pricePerNight;

  console.log("Hotel ID:", id);
  console.log("Hotel data:", hotel);

  const cardNumber = watch("cardNumber") || "";

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setValue("cardNumber", value);
  };

  const fetchHotelData = async () => {
    if (!id) {
      console.error("Hotel ID is undefined");
      toast.error("Invalid hotel ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching hotel with ID:", id);
      const res = await axiosInstance.get(`/hotels/${id}`);
      setHotel(res?.data);
    } catch (err) {
      console.error("Error fetching hotel:", err);
      toast.error("Failed to load hotel details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, [id]);

  const onSubmit = (data) => {
    if (!loggedUser || !loggedUser.email) {
      toast.error("Please login to book a hotel");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const bookingData = {
      id: Date.now(),
      hotelId: id,
      userId: loggedUser.email,
      hotelName: hotel.name,
      ...data,
      checkIn,
      checkOut,
      nights,
      pricePerNight,
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    };

    dispatch(hotelSlice.actions.addBooking(bookingData));
    setBookingData(bookingData);
    setShowSuccessModal(true);
  };
  if (loading) {
    return <div className="p-4 sm:p-8 text-center text-lg">Loading...</div>;
  }

  if (!hotel) {
    return (
      <div className="p-4 sm:p-8 text-center text-lg">Hotel not found</div>
    );
  }

  return (
    <div className="p-3 sm:p-5">
      <div className="bg-[#FBFCFD] rounded-lg px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 w-full mb-4 sm:mb-6">
        <h2 className="font-bold text-lg sm:text-xl mr-2">Booking</h2>
        <span className="text-gray-500 hidden sm:inline">|</span>
        <span className="text-gray-500 sm:ml-2 pr-2">
          <p className="inline pr-1">
            Hotels {">"} Hotel Details {">"}
          </p>
          <p className="text-blue-600 inline">Booking</p>
        </span>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">
        <div className="flex-1 bg-[#FBFCFD] rounded-lg p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Your Details</h2>
          <p className="text-gray-400 text-sm mb-6">{hotel.description}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Title
                </label>
                <select
                  {...register("title", { required: "Title is required" })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.title ? "border-red-500" : "border-gray-200"
                  }`}
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
                {errors.title && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.firstName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="yourmail@gmail.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Country
                </label>
                <select
                  {...register("country", { required: "Country is required" })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.country ? "border-red-500" : "border-gray-200"
                  }`}
                >
                  <option value="">Select Country</option>
                  <option value="Egypt">Egypt</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
                {errors.country && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Mobile
                </label>
                <input
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^\+?[\d\s-]+$/,
                      message: "Please enter a valid mobile number",
                    },
                  })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.mobile ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="+20 000 0000 000"
                />
                {errors.mobile && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.mobile.message}
                  </span>
                )}
              </div>
            </div>
            <hr className="my-6 sm:my-8 border-gray-200" />
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Payment Details
            </h2>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Card Number
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  {...register("cardNumber", {
                    required: "Card number is required",
                    pattern: {
                      value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                      message:
                        "Please enter a valid card number (XXXX XXXX XXXX XXXX)",
                    },
                  })}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.cardNumber ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="**** **** **** ****"
                />
                <div className="flex items-center gap-1">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="visa"
                    className="w-8 sm:w-10 h-4 sm:h-5 object-contain"
                  />
                  <img
                    src="https://icon-library.com/images/mastercard-icon/mastercard-icon-12.jpg"
                    alt="mc"
                    className="w-8 sm:w-10 h-4 sm:h-5 object-contain"
                  />
                  <img
                    src="https://icon-library.com/images/amex-icon/amex-icon-17.jpg"
                    alt="amex"
                    className="w-8 sm:w-10 h-4 sm:h-5 object-contain"
                  />
                  <img
                    src="https://icon-library.com/images/discover-credit-card-icon/discover-credit-card-icon-13.jpg"
                    alt="discover"
                    className="w-8 sm:w-10 h-4 sm:h-5 object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">CVV</label>
                <input
                  {...register("cvv", {
                    required: "CVV is required",
                    pattern: {
                      value: /^\d{3,4}$/,
                      message: "Please enter a valid CVV (3-4 digits)",
                    },
                  })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.cvv ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="123"
                />
                {errors.cvv && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.cvv.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Expiry Date
                </label>
                <input
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: "Please enter a valid expiry date (MM/YY)",
                    },
                  })}
                  className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                    errors.expiryDate ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.expiryDate.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Card Holder
              </label>
              <input
                {...register("cardHolder", {
                  required: "Card holder name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      "Please enter a valid name (letters and spaces only)",
                  },
                })}
                className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none text-sm ${
                  errors.cardHolder ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="John Doe"
              />
              {errors.cardHolder && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.cardHolder.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-[#0A6ADA] text-white font-bold py-2 rounded-md text-base sm:text-lg hover:bg-blue-700 transition"
            >
              PAY NOW
            </button>
          </form>
        </div>
        <div className="w-full xl:w-[350px] flex-shrink-0 bg-[#FBFCFD] rounded-lg p-4 sm:p-6 h-fit shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Summary</h2>
          <div className="mb-3">
            <img
              src={hotel.images?.main || hotel.images?.gallery?.[0]}
              alt={hotel.name}
              className="w-full h-40 sm:h-50 object-cover rounded-xl mb-2"
            />
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm sm:text-base leading-tight mb-1 truncate">
                  {hotel.name}
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-[14px] text-gray-400 mb-1">
                  <span className="text-blue-600">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <span className="truncate">
                    {hotel.address?.street}, {hotel.address?.city},{" "}
                    {hotel.address?.state}
                  </span>
                </div>
              </div>
              <div className="text-right ml-2">
                {hotel.pricing?.[0]?.discount && (
                  <span className="text-red-600 font-bold text-xs block">
                    {hotel.pricing[0].discount}
                  </span>
                )}
                <span className="flex items-end gap-1 justify-end">
                  <span className="text-gray-900 font-bold text-2xl sm:text-3xl leading-tight">
                    {hotel.pricing?.[0]?.discountedPrice || pricePerNight}
                  </span>
                  <span className="text-gray-400 text-xs mb-1">
                    {hotel.pricing?.[0]?.currency || "USD"}
                  </span>
                </span>
                <div className="text-gray-400 text-xs">
                  {hotel.pricing?.[0]?.priceUnit || "Per night"}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p className="block text-gray-700 font-semibold mb-1 text-sm">
              Check In
            </p>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none font-semibold text-gray-800 text-sm"
            />
          </div>
          <div className="mb-2">
            <p className="block text-gray-700 font-semibold mb-1 text-sm">
              Check Out
            </p>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={minCheckOut}
              disabled={!checkIn}
              className={`w-full border border-gray-200 rounded-lg px-3 py-2 font-semibold text-gray-800 text-sm ${
                !checkIn
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white focus:outline-none"
              }`}
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm mb-1 mt-6 sm:mt-8">
            <span className="text-gray-500">Price Per Night</span>
            <span className="text-gray-700 font-semibold">
              ${hotel.pricing?.[0]?.discountedPrice || pricePerNight}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
            <span className="text-gray-500">Nights</span>
            <span className="text-gray-700 font-semibold">{nights}</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex items-center justify-between text-sm sm:text-base font-bold mt-2">
            <span>Total Price</span>
            <span className="text-[#0A6ADA]">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Success Payment Modal */}
      {showSuccessModal && bookingData && (
        <SuccessPay
          bookingData={bookingData}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
