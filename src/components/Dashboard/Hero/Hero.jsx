import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Spinner/Spinner";
import axiosIntance from "../../../api/axiosInstance";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import useRole from "../../../hooks/useRole";

const Hero = () => {
    const { role, isRoleLoading, isRoleError } = useRole();
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosIntance.get("/api/dashboard-stats");
                setStats([
                    { label: "👤 Total Users", value: data.users },
                    { label: "🍽️ Meals Served", value: data.mealsServed },
                    { label: "💬 Reviews Posted", value: data.reviews },
                    {
                        label: "💵 Total Revenue",
                        value: `$${data.revenue.toFixed(2)}`,
                    },
                ]);
            } catch (err) {
                console.error("Error fetching dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <Spinner />;
    if (isRoleLoading) return <Spinner />;
    if (isRoleError)
        return (
            <p className="text-red-500 text-lg text-center">
                Error loading role
            </p>
        );

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-8 mb-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <h1 className="text-xl md:text-4xl font-extrabold mb-2">
                        Welcome back <br />
                        <span className="text-primary text-semibold">
                            {user.displayName}
                        </span>
                        <br />
                    </h1>
                    <p className="text-accent max-w-md">
                        {role === "admin"? "Here's a quick overview of your platform's performance and user activity.":"Welcome to dashboard"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {role === "admin" && stats.map(({ label, value }) => (
                        <div
                            key={label}
                            className="bg-base-100 cursor-pointer shadow-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-secondary/30 rounded-lg px-5 py-4 flex flex-col items-center text-center">
                            <span className="text-3xl font-extrabold text-primary">
                                {value}
                            </span>
                            <span className="text-sm mt-1 opacity-90">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Chart */}
            {role === "admin" && (
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4 text-center text-primary">
                        Performance Overview
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={stats}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="value"
                                    fill="#4f46e5"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
