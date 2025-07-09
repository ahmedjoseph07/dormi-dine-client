import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { FaUserFriends } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import ThemeToggleBtn from "../ThemeButton/ThemeToggleBtn";

const Navbar = () => {
    return (
        <div className="shadow-lg">
            <div className="drawer z-50 top-0 w-11/12 md:w-10/12 mx-auto">
                <input
                    id="nav-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex items-center justify-between px-4 py-3 bg-base-100">
                    {/* Left: Brand */}
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-12 rounded-4xl"
                            />
                            <div className="text-xl font-bold">
                                <span className="text-primary">Dormi</span>
                                <span>Dine</span>
                            </div>
                        </Link>
                        <ThemeToggleBtn />
                    </div>

                    {/* Middle: Desktop Menu */}
                    <div className="hidden md:flex gap-6 items-center">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `relative text-neutral duration-200 
                            after:absolute after:top-0 after:left-0
                            after:h-[2px] after:w-full after:bg-primary 
                            after:origin-left after:scale-x-0 after:transition-transform after:duration-300 
                            ${
                                isActive
                                    ? "font-bold after:scale-x-100 text-primary"
                                    : "hover:after:scale-x-100"
                            }`
                            }>
                            Home
                        </NavLink>

                        <NavLink
                            to="/meals"
                            className={({ isActive }) =>
                                `relative text-neutral duration-200 
                            after:absolute after:top-0 after:left-0
                            after:h-[2px] after:w-full after:bg-primary 
                            after:origin-left after:scale-x-0 after:transition-transform after:duration-300 
                            ${
                                isActive
                                    ? "font-bold after:scale-x-100 text-primary"
                                    : "hover:after:scale-x-100"
                            }`
                            }>
                            Meals
                        </NavLink>

                        <NavLink
                            to="/upcoming-meal"
                            className={({ isActive }) =>
                                `relative text-neutral duration-200 
                            after:absolute after:top-0 after:left-0
                            after:h-[2px] after:w-full after:bg-primary 
                            after:origin-left after:scale-x-0 after:transition-transform after:duration-300 
                            ${
                                isActive
                                    ? "font-bold after:scale-x-100 text-primary"
                                    : "hover:after:scale-x-100"
                            }`
                            }>
                            Upcoming Meals
                        </NavLink>
                    </div>

                    <div className="hidden md:flex justify-center items-center gap-4">
                        <FaBell className="cursor-pointer hover:scale-130 transition all duration-300 " />
                        <Link
                            to="/login"
                            className="btn btn-secondary btn-outline  flex items-center gap-2 transition all duration-500 ">
                            <FaUserFriends />
                            Join Us
                        </Link>
                    </div>

                    {/* Right: Burger Icon for Mobile */}
                    <div className="md:hidden">
                        <label
                            htmlFor="nav-drawer"
                            className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>
                </div>

                {/* Drawer Side (Mobile Menu) */}

                <div className="drawer-side">
                    <label
                        htmlFor="nav-drawer"
                        className="drawer-overlay"></label>
                    <ul className="menu p-6 w-64 min-h-full bg-base-100 space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                className="text-neutral hover:text-primary">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/meals"
                                className="text-neutral hover:text-primary">
                                Meals
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/upcoming-meal"
                                className="text-neutral hover:text-primary">
                                Upcoming Meals
                            </NavLink>
                        </li>
                        <li className="mt-6 border-t pt-4">
                            <Link
                                to="/login"
                                className="text-secondary w-full flex justify-center items-center gap-2 btn">
                                <FaUserFriends />
                                Join Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
