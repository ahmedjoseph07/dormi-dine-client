import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <div className="bg-base-200 pt-12 px-4 shadow-inner">
            <footer className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
                    {/* Logo & About */}
                    <div className="flex flex-col gap-4">
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
                        <p className="text-accent text-sm md:text-base">
                            Simplifying hostel living with organized meal plans
                            and a better community experience.
                        </p>
                        <div className="flex gap-4 mt-2 text-accent">
                            <a
                                href="#"
                                className="hover:text-primary transition-colors duration-300">
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition-colors duration-300">
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition-colors duration-300">
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition-colors duration-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-neutral">
                            Quick Links
                        </h3>
                        <Link
                            to="/"
                            className="hover:underline hover:text-primary text-accent transition-colors duration-300">
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="hover:underline hover:text-primary text-accent transition-colors duration-300">
                            About Us
                        </Link>
                        <Link
                            to="/contact-us"
                            className="hover:underline hover:text-primary text-accent transition-colors duration-300">
                            Contact Us
                        </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-neutral">
                            Contact
                        </h3>
                        <p className="text-accent text-sm md:text-base">
                            123 Dormi Street, Hostel City, BD
                        </p>
                        <p className="text-accent text-sm md:text-base">
                            Email: support@dormidine.com
                        </p>
                        <p className="text-accent text-sm md:text-base">
                            Phone: +880 1234 567890
                        </p>
                    </div>
                </div>

                <div className="divider" />

                <div className="text-center pb-6 text-sm text-accent">
                    &copy; {new Date().getFullYear()} DormiDine. All rights
                    reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;
