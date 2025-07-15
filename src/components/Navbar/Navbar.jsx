import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import { FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import ThemeToggleBtn from "../ThemeButton/ThemeToggleBtn";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const {role} = useRole();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "User logged out successfully",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="bg-base-200 shadow-xl">
            <div className="drawer z-50 top-0 max-w-7xl mx-auto">
                <input
                    id="nav-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex items-center justify-between px-4 py-3">

                    {/*Brand logo*/}
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

                    {/*Desktop Menu */}
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
                            to="/upcoming-meals"
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

                    {/*User Avater Dropdown */}
                    <div className="hidden md:flex justify-center items-center gap-4">
                        <FaBell className="cursor-pointer hover:scale-130 transition all duration-300 " />
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar tooltip tooltip-right before:text-primary before:bg-neutral before:font-bold"
                                    data-tip={ role.toUpperCase() || "Profile"}>
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-48">
                                    <li className="text-center btn btn-accent mb-2 font-bold py-2 text-neutral pointer-events-none">
                                        @{user.displayName || "Username"}
                                    </li>
                                    <Link to="/dashboard" className="btn mb-2">
                                        Dashboard
                                    </Link>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="btn flex items-center gap-2 text-secondary">
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-secondary flex items-center gap-2 transition all duration-500 ">
                                <FaUserFriends />
                                Join Us
                            </Link>
                        )}
                    </div>

                    {/*Burger Icon for Mobile */}
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
                                to="/upcoming-meals"
                                className="text-neutral hover:text-primary">
                                Upcoming Meals
                            </NavLink>
                        </li>
                        <li className="mt-6 border-t pt-4">
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="btn mb-2">
                                        Dashboard
                                    </Link>
                                    <div className="btn btn-secondary">
                                        <Link className="flex gap-3">
                                            <FaSignOutAlt className="text-xl" />
                                            <button onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-secondary w-full flex justify-center items-center gap-2 btn">
                                    <FaUserFriends />
                                    Join Us
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
