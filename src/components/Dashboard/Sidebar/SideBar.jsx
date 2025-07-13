import { useState } from "react";
import {
    FaBars,
    FaHome,
    FaUser,
    FaUtensils,
    FaCommentAlt,
    FaMoneyBill,
    FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const DashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <div className="drawer lg:drawer-open">
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                readOnly
            />
            <div className="drawer-content flex flex-col">
                <div className="bg-base-100 shadow px-4 py-3 flex justify-between items-center lg:hidden sticky top-0 z-50">
                    <Link
                        to="/dashboard"
                        className="text-lg font-bold text-primary">
                        Dashboard
                    </Link>
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-ghost btn-circle"
                        onClick={toggleDrawer}>
                        <FaBars size={22} />
                    </label>
                </div>
            </div>

            <div className="drawer-side z-50">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                    onClick={toggleDrawer}></label>
                <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-base-300 flex flex-col justify-between">
                    <div>
                        <Link
                            to="/dashboard"
                            className="text-2xl font-bold text-primary">
                            Dashboard
                        </Link>

                        <li>
                            <Link to="profile">
                                <FaUser className="mr-2" /> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="requested-meals">
                                <FaUtensils className="mr-2" /> Requested Meals
                            </Link>
                        </li>
                        <li>
                            <Link to="my-reviews">
                                <FaCommentAlt className="mr-2" /> My Reviews
                            </Link>
                        </li>
                        <li>
                            <Link to="payment-history">
                                <FaMoneyBill className="mr-2" /> Payment History
                            </Link>
                        </li>
                    </div>

                    {/* Footer: Theme toggle + logout */}
                    <div className="space-y-4 mt-8">
                        <div className="flex gap-2">
                            <Link to="/" className="btn btn-primary">
                                <FaHome /> Back to Home
                            </Link>
                            <button className="btn btn-secondary">
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardSidebar;
