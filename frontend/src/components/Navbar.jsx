import { Link } from "react-router-dom";
import { FaRegHeart, FaBars } from "react-icons/fa6";
import { ImSearch } from "react-icons/im";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import avatar from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Orders", href: "/orders" },
	{ name: "Cart Page", href: "/cart" },
	{ name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const cartItem = useSelector((state) => state.cart.cartItem);

	const { currentUser, logout } = useAuth();

	const handleLogOut = () => {
		logout();
	};

	return (
		<header className="shadow-md bg-white mx-auto sticky top-0 z-50">
			<nav className="container mx-auto px-4 py-6 font-primary  flex justify-between items-center">
				{/* Left Side */}
				<div className="flex items-center md:gap-8 gap-4">
					{/* Hamburger Menu */}
					<Link to="/">
						<FaBars className="text-gray-700 text-xl cursor-pointer" />
					</Link>

					{/* Search Input */}
					<div className="relative sm:w-72 w-40">
						<ImSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
						<input
							type="text"
							placeholder="ค้นหาที่นี่"
							className="bg-gray-100 w-full py-2 pl-10 pr-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				{/* Right Side */}
				<div className="flex items-center md:gap-6 gap-4">
					{/* Cart */}
					<Link
						to="/cart"
						className="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 rounded-lg transition"
					>
						<IoCartOutline className="text-xl" />
						<span className="ml-2 text-sm font-medium">
							{cartItem.length > 0 ? cartItem.length : 0}
						</span>
					</Link>

					{/* User Avatar or Login */}
					<div className="relative">
						{currentUser ? (
							<>
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="focus:outline-none"
								>
									<img
										src={avatar}
										alt="avatar"
										className="w-8 h-8 rounded-full ring-2 ring-blue-500"
									/>
								</button>

								{/* Dropdown */}
								{isDropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-40">
										<ul className="py-2">
											{navigation.map((item) => (
												<li key={item.name}>
													<Link
														to={item.href}
														onClick={() => setIsDropdownOpen(false)}
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
													>
														{item.name}
													</Link>
												</li>
											))}
											<li>
												<button
													onClick={handleLogOut}
													className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Logout
												</button>
											</li>
										</ul>
									</div>
								)}
							</>
						) : (
							<Link to="/login">
								<FaRegUserCircle className="text-gray-700 text-2xl cursor-pointer" />
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
