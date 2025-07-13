import React from "react";

const stats = [
    { label: "New Requests", value: 12 },
    { label: "Notifications", value: 5 },
    { label: "Completed Meals", value: 34 },
    { label: "Profile Completeness", value: "85%" },
];

const DashboardHero = () => {
    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-8 mb-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <h1 className="text-xl md:text-4xl font-bold mb-2">
                        Welcome back{" "} <br />
                        <span className="text-primary">Username</span>
                    </h1>
                    <p className="text-accent max-w-md">
                        Glad to see you again! Here’s a quick snapshot of your
                        recent activity and key stats to help you stay on top of
                        everything.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {stats.map(({ label, value }) => (
                        <div
                            key={label}
                            className={`bg-base-100 cursor-pointer shadow-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-secondary/30 rounded-lg px-5 py-4 flex flex-col items-center`}>
                            <span className="text-3xl font-extrabold">
                                {value}
                            </span>
                            <span className="text-sm mt-1 opacity-90">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
