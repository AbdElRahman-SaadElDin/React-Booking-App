import { createSlice } from "@reduxjs/toolkit";

const getBookingsForUser = (user) => {
  if (!user || !user.email) return [];
  try {
    const all = JSON.parse(localStorage.getItem("userBookings") || "{}") || {};
    return all[user.email] || [];
  } catch {
    return [];
  }
};

const getBookedHotelIdsForUser = (user) => {
  if (!user || !user.email) return [];
  try {
    const all =
      JSON.parse(localStorage.getItem("userBookedHotelIds") || "{}") || {};
    return all[user.email] || [];
  } catch {
    return [];
  }
};

const initialState = {
  bookings: [],
  bookedHotelIds: [],
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      const user = JSON.parse(localStorage.getItem("logedUser") || "null");
      if (user && user.email) {
        const all =
          JSON.parse(localStorage.getItem("userBookings") || "{}") || {};
        all[user.email] = state.bookings;
        localStorage.setItem("userBookings", JSON.stringify(all));

        const bookedIds =
          JSON.parse(localStorage.getItem("userBookedHotelIds") || "{}") || {};
        if (!bookedIds[user.email]) {
          bookedIds[user.email] = [];
        }
        if (!bookedIds[user.email].includes(action.payload.hotelId)) {
          bookedIds[user.email].push(action.payload.hotelId);
        }
        localStorage.setItem("userBookedHotelIds", JSON.stringify(bookedIds));
        state.bookedHotelIds = bookedIds[user.email];
      }
    },
    clearBookings: (state) => {
      state.bookings = [];
      const user = JSON.parse(localStorage.getItem("logedUser") || "null");
      if (user && user.email) {
        const all =
          JSON.parse(localStorage.getItem("userBookings") || "{}") || {};
        all[user.email] = [];
        localStorage.setItem("userBookings", JSON.stringify(all));
      }
    },
    restoreBookings: (state) => {
      const user = JSON.parse(localStorage.getItem("logedUser") || "null");
      state.bookings = getBookingsForUser(user);
      state.bookedHotelIds = getBookedHotelIdsForUser(user);
    },
    checkIfHotelBooked: (state, action) => {
      return state.bookedHotelIds.includes(action.payload);
    },
  },
});
