import React from "react";
import img from "../../../assets/meal.webp";

const AdminProfile = ({ admin }) => {
    admin = admin || {
        name: "Admin User",
        email: "admin@example.com",
        totalMeals: 23,
        role: "Administrator",
        joined: "2022-10-15",
        lastLogin: "2025-07-12 10:34 AM",
    };

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Admin Profile
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={img}
                    alt="Admin"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary">
                        {admin.name}
                    </h3>
                    <p className="text-accent">{admin.email}</p>
                    <p className="text-sm text-base-content/70 mt-2">
                        <span className="font-medium">Role:</span> {admin.role}
                    </p>
                    <p className="text-sm text-base-content/70 mt-1">
                        <span className="font-medium">Meals Added:</span>{" "}
                        {admin.totalMeals}
                    </p>
                    <p className="text-sm text-base-content/70 mt-1">
                        <span className="font-medium">Joined:</span>{" "}
                        {new Date(admin.joined).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-base-content/70 mt-1">
                        <span className="font-medium">Last Login:</span>{" "}
                        {admin.lastLogin}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
