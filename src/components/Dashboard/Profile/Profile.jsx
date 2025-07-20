import React from "react";
import img from "../../../assets/meal.webp";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Spinner/Spinner";

const Profile = () => {
    const { user } = useAuth();

    const {
        data: userData = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await axiosInstance(`/api/user?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Spinner />;
    if(isError) return <p className="text-red-500 text-xl">Falied to load data</p>

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">My Profile</h2>

            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
                <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-semibold text-primary">
                        {userData.name}
                    </h3>
                    <p className="text-accent">{user.email}</p>
                    <p className="text-sm text-base-content/70">
                        <span className="font-medium">Role:</span>{" "}
                        {userData.role.toUpperCase()}
                    </p>
                    <p className="text-sm text-base-content/70">
                        <span className="font-medium">Joined:</span>{" "}
                        {new Date(userData.joined).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap flex-col">
                        <span className={`badge  ${userData.package !== "free" ? "badge-success":"badge-ghost" }  p-3 font-medium`}>
                            {userData.package.toUpperCase()}
                        </span>
                        <button className="btn btn-secondary btn-sm w-full md:w-1/6">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
