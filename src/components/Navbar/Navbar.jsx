import React from "react";
import { fallDown as Menu } from "react-burger-menu";
import "./Navbar.css";
import logo from "../../assets/logo.png"
import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="w-full bg-base-100 shadow-md px-4 py-3 flex items-center justify-between z-50 fixed top-0 ">
            {/* Brand */}
            <Link to='/' className="flex justify-center items-center gap-2">
            <img className="w-12" src={logo}alt="" />
            <div className="text-xl font-bold text-primary z-50">Dormi<span className="text-green-500">Dine</span></div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-4 items-center">
                <a href="/" className="text-neutral hover:text-primary">
                    Home
                </a>
                <a href="/about" className="text-neutral hover:text-primary">
                    About
                </a>
                <a href="/meals" className="text-neutral hover:text-primary">
                    Meals
                </a>
                <a href="/login" className="btn btn-primary btn-sm">
                    Login
                </a>
            </nav>

            {/* Mobile Burger Menu */}
            <div className="md:hidden" pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                <Menu right>
                    <a className="menu-item" href="/">
                        Home
                    </a>
                    <a className="menu-item" href="/about">
                        About
                    </a>
                    <a className="menu-item" href="/meals">
                        Meals
                    </a>
                    <a className="menu-item" href="/login">
                        Login
                    </a>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;
