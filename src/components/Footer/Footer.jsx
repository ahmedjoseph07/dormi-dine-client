import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { MdSubscriptions } from "react-icons/md";

const Footer = () => {
    return (
        <div className="bg-base-200 pt-10 px-4 shadow-xl">
            <footer className="max-w-7xl mx-auto">
                <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
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
                        <p className="text-normal text-accent">
                            Simplifying hostel living with organized meal plans
                            and better community experience.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a
                                href="#"
                                className="hover:text-primary transition">
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition">
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition">
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col  gap-2">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <Link
                            to="/"
                            className="hover:underline hover:text-primary text-accent">
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="hover:underline hover:text-primary text-accent">
                            About Us
                        </Link>
                        <Link
                            to="/contact-us"
                            className="hover:underline hover:text-primary text-accent">
                            Contact Us
                        </Link>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Newsletter</h3>
                        <p className="text-normal text-accent">
                            Stay updated with our latest features and updates.
                        </p>
                        <form className="flex flex-col xl:flex-row w-full gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="outline-0 border py-2 px-4 w-full  sm:rounded-l-lg rounded-lg"
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-secondary w-full sm:w-auto sm:rounded-r-lg rounded-lg">
                                <MdSubscriptions className="text-xl" />Subscribe
                            </button>
                        </form>
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
