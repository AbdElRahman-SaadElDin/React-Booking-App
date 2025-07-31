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

const initialState = {
	bookings: [],
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
				const all = JSON.parse(localStorage.getItem("userBookings") || "{}") || {};
				all[user.email] = state.bookings;
				localStorage.setItem("userBookings", JSON.stringify(all));
			}
		},
		clearBookings: (state) => {
			state.bookings = [];
			const user = JSON.parse(localStorage.getItem("logedUser") || "null");
			if (user && user.email) {
				const all = JSON.parse(localStorage.getItem("userBookings") || "{}") || {};
				all[user.email] = [];
				localStorage.setItem("userBookings", JSON.stringify(all));
			}
		},
		restoreBookings: (state) => {
			const user = JSON.parse(localStorage.getItem("logedUser") || "null");
			state.bookings = getBookingsForUser(user);
		},
	},
});
