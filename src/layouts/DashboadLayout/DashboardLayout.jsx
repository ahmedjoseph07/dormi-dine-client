import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Dashboard/Sidebar/SideBar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-base-200">
            <div className="lg:w-72 w-full border-b lg:border-b-0 lg:border-r border-base-300">
                <Sidebar />
            </div>
            <div className="flex-1 p-4 flex justify-center items-center overflow-y-auto">
                <div className="w-full max-w-6xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
