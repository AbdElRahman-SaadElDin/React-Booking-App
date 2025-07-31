import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../network/interceptor";

export default function SearchCard({ onSearch }) {
  const countries = [
    { label: "United States", value: "US" },
    { label: "Morocco", value: "MA" },
    { label: "Egypt", value: "EG" },
    { label: "Greece", value: "GR" },
  ];
  const [searchData, setSearchData] = useState({
    search: "",
    country: "",
    checkIn: "",
    checkOut: "",
  });
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const calculateMinCheckOut = () => {
    if (!searchData.checkIn) return today;
    const checkInDate = new Date(searchData.checkIn);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(checkInDate.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  const minCheckOut = calculateMinCheckOut();

  useEffect(() => {
    if (searchData.checkOut && searchData.checkOut < minCheckOut) {
      setSearchData((prev) => ({
        ...prev,
        checkOut: "",
      }));
    }
  }, [searchData.checkIn, searchData.checkOut, minCheckOut]);

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setSearchData({
      search: "",
      country: "",
      checkIn: "",
      checkOut: "",
    });
  };

  const handleSearch = async () => {
    try {
      let url = "/hotels";
      const params = [];
      if (searchData.search) {
        params.push(`name_like=${encodeURIComponent(searchData.search)}`);
      }
      if (searchData.country) {
        params.push(
          `address.countryIsoCode=${encodeURIComponent(searchData.country)}`
        );
      }
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      const res = await axiosInstance.get(url);
      if (onSearch) {
        onSearch(res.data, searchData);
      }
      navigate("/search");
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  useEffect(() => {
    const fetchAllHotels = async () => {
      try {
        const res = await axiosInstance.get("/hotels");
        if (onSearch) {
          onSearch(res.data, {});
        }
      } catch (err) {}
    };
    fetchAllHotels();
  }, []);

  return (
    <div className="bg-white/90 px-3 sm:px-5 py-4 rounded-2xl shadow-lg min-h-[87px]">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 h-full">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            SEARCH
          </label>
          <input
            type="text"
            value={searchData.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Search..."
          />
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            COUNTRY
          </label>
          <div className="relative">
            <select
              value={searchData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            CHECK-IN
          </label>
          <div className="relative">
            <input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => handleInputChange("checkIn", e.target.value)}
              min={today}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Check-in date"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            CHECK-OUT
          </label>
          <div className="relative">
            <input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => handleInputChange("checkOut", e.target.value)}
              min={minCheckOut}
              disabled={!searchData.checkIn}
              className={`w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                !searchData.checkIn ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Check-out date"
            />
          </div>
        </div>

        <div className="flex items-end justify-between sm:justify-end gap-2 sm:gap-4">
          <button
            onClick={clearFilters}
            className="text-gray-700 underline hover:text-gray-900 transition-colors text-xs sm:text-sm"
          >
            Clear Filters
          </button>

          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
