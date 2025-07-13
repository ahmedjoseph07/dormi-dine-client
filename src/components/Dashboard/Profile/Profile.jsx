import React from "react";
import img from "../../../assets/meal.webp";

const Profile = ({ user }) => {

    user = user || {
        name: "Joseph Ahmed",
        email: "joseph@example.com",
        role: "Verified User",
        joined: "2023-06-01",
        badges: ["Bronze", "Gold"],
        totalMeals: 12,
        totalReviews: 5,
    };

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">My Profile</h2>

            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={img}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
                <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-semibold text-primary">
                        {user.name}
                    </h3>
                    <p className="text-accent">{user.email}</p>
                    <p className="text-sm text-base-content/70">
                        <span className="font-medium">Role:</span> {user.role}
                    </p>
                    <p className="text-sm text-base-content/70">
                        <span className="font-medium">Joined:</span>{" "}
                        {new Date(user.joined).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {user.badges.map((badge) => (
                            <span
                                key={badge}
                                className="badge badge-ghost font-medium">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
                <button className="btn btn-secondary btn-sm">
                    Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
                <div className="cursor-pointer rounded-xl p-4 bg-base-100 shadow-xl hover:scale-[1.02] hover:shadow-secondary/30 transition-all duration-300">
                    <h4 className="text-xl font-bold text-primary">
                        {user.totalMeals}
                    </h4>
                    <p className="text-sm opacity-70">Meals Requested</p>
                </div>

                <div className="cursor-pointer rounded-xl p-4 bg-base-100 shadow-xl hover:scale-[1.02] hover:shadow-secondary/30 transition-all duration-300">
                    <h4 className="text-xl font-bold text-primary">
                        {user.totalReviews}
                    </h4>
                    <p className="text-sm opacity-70">Reviews Written</p>
                </div>

                <div className="cursor-pointer rounded-xl p-4 bg-base-100 shadow-xl hover:scale-[1.02] hover:shadow-secondary/30 transition-all duration-300">
                    <h4 className="text-xl font-bold text-primary">85%</h4>
                    <p className="text-sm opacity-70">Profile Completed</p>
                </div>

                <div className="cursor-pointer rounded-xl p-4 bg-base-100 shadow-xl hover:scale-[1.02] hover:shadow-secondary/30 transition-all duration-300">
                    <h4 className="text-xl font-bold text-primary">2</h4>
                    <p className="text-sm opacity-70">Badges Earned</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
