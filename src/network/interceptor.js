import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://booking-app-db.vercel.app",
});

let showLoader = () => {};
let hideLoader = () => {};

axiosInstance.interceptors.request.use(
	(config) => {
		showLoader();
		return config;
	},
	(error) => {
		hideLoader();
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		hideLoader();
		return response;
	},
	(error) => {
		hideLoader();
		return Promise.reject(error);
	}
);

export const loaderHandlers = (handlers) => {
	showLoader = handlers.showLoader;
	hideLoader = handlers.hideLoader;
};
