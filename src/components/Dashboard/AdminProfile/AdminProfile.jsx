import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance"; 
import  useAuth  from "../../../hooks/useAuth";
import Spinner from "../../Spinner/Spinner";

const AdminProfile = () => {
    const { user } = useAuth(); 

    const {
        data: admin,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["adminProfile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get("/api/user", {
                params: { email: user.email },
            });
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center h-40">
                <Spinner/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full text-center text-error font-semibold">
                {error?.response?.data?.message ||
                    "Failed to load admin profile."}
            </div>
        );
    }

    const fallback = {
        name: "Admin User",
        email: "admin@example.com",
        totalMeals: 0,
        role: "Administrator",
        joined: new Date().toISOString(),
    };

    const profile = admin || fallback;

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Admin Profile
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user?.photoURL}
                    alt="Admin"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary">
                        {profile.name}
                    </h3>
                    <p className="text-accent">{profile.email}</p>
                    <p className="text-sm text-base-content/70 mt-2">
                        <span className="font-medium">Role:</span>{" "}
                        {profile.role}
                    </p>
                    <p className="text-sm text-base-content/70 mt-1">
                        <span className="font-medium">Meals Added:</span>{" "}
                        {profile.mealsAdded}
                    </p>
                    <p className="text-sm text-base-content/70 mt-1">
                        <span className="font-medium">Joined:</span>{" "}
                        {new Date(profile.joined).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
