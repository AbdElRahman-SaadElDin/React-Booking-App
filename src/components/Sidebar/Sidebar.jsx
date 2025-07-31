import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideLogo from "../../assets/SideLogo.png";
import CloudImage from "../../assets/Image.png";

export default function Sidebar({ isCollapsed, onToggleCollapse }) {
	const [activeItem, setActiveItem] = useState("home");

	const menuItems = [
		{ id: "home", label: "Home", icon: "fas fa-home" },
		{ id: "bookings", label: "My Bookings", icon: "fas fa-user" },
		{ id: "explore", label: "Explore", icon: "fas fa-globe" },
		{ id: "support", label: "Support", icon: "fas fa-question" },
	];

	return (
		<div
			className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-50 ${
				isCollapsed ? "w-20" : "w-64"
			}`}
			style={{
				background:
					"linear-gradient(141.08deg, #0A69DA 32.24%, #0856C8 115.93%, #0231A5 164.9%)",
			}}
		>
			<div className='flex flex-col h-full sidebar-container'>
				<div className='flex items-center justify-between p-6 flex-shrink-0 sidebar-header'>
					{!isCollapsed && (
						<div className='flex items-center'>
							<img src={SideLogo} alt='Bookler' className='h-10 w-auto' />
						</div>
					)}
					<button
						onClick={onToggleCollapse}
						className='text-white hover:text-gray-200 transition-colors duration-200'
					>
						<i className='fa-solid fa-bars text-xl'></i>
					</button>
				</div>

				<nav className='flex-1 px-6 py-4 sidebar-nav'>
					<ul className='space-y-4'>
						{menuItems.map((item) => (
							<li key={item.id}>
								<button
									onClick={() => setActiveItem(item.id)}
									className={`w-full flex items-center transition-all duration-200 ${
										isCollapsed
											? "justify-center px-3 py-4 rounded-lg"
											: "px-6 py-4 rounded-full"
									} ${
										activeItem === item.id
											? "bg-blue-400 text-white shadow-lg"
											: "text-white hover:bg-white hover:bg-opacity-10"
									}`}
								>
									<i
										className={`${item.icon} text-lg ${!isCollapsed ? "mr-4" : ""}`}
									></i>
									{!isCollapsed && <span className='font-medium'>{item.label}</span>}
								</button>
							</li>
						))}
					</ul>
				</nav>

				{!isCollapsed && (
					<div className='absolute bottom-0 left-0 right-0 h-48'>
						<img
							src={CloudImage}
							alt='Clouds'
							className='w-full h-full object-cover rounded-br-xl'
						/>
					</div>
				)}

				{!isCollapsed && (
					<div className='absolute bottom-6 left-6 right-6 z-10'>
						<Link
							to='/register'
							className='block w-full bg-white text-red-600 font-bold py-4 px-6 rounded-full border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-lg text-center'
						>
							Sign UP Now
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
