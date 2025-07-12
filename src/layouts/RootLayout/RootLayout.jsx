import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow bg-base-200">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default RootLayout;
