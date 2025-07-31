import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SearchCard from "../components/SearchCard/SearchCard";
import styles from "./User.module.css";
import HotelCard from "../components/HotelCard/HotelCard";
import SearchPage from "../pages/SearchPage/SearchPage";
import Details from "../pages/Details/Details";
import BookingPage from "../pages/BookingPage/BookingPage";
import Profile from "../pages/Profile/Profile";

import { useCallback } from "react";

const User = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [hotels, setHotels] = useState([]);

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};

	const handleSearchResults = useCallback((results) => {
		setHotels(results);
	}, []);

	return (
		<div className='flex h-screen'>
			<Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
			<div
				className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
					isSidebarCollapsed ? "ml-20" : "ml-64"
				}`}
			>
				<Navbar />
				<div className='relative -mt-8 z-20 px-6'>
					<SearchCard onSearch={handleSearchResults} />
				</div>
				<main className='flex-1'>
					<Outlet context={{ hotels, setHotels }} />
				</main>
			</div>
		</div>
	);
};

export default User;
