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
    RadialBarChart,
    RadialBar,
    Legend,
} from "recharts";
import useRole from "../../../hooks/useRole";

const Hero = () => {
    const { role, isRoleLoading, isRoleError } = useRole();
    const { user } = useAuth();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosIntance.get("/api/dashboard-stats");
                setStats([
                    { label: "Total Users", value: data?.users ?? 0 },
                    { label: "Meals Served", value: data?.mealsServed ?? 0 },
                    { label: "Total Revenue", value: data?.revenue ?? 0 },
                ]);
            } catch (err) {
                console.error("Error fetching dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading || isRoleLoading) return <Spinner />;
    if (isRoleError)
        return (
            <p className="text-red-500 text-lg text-center">
                Error loading role
            </p>
        );

    // Prepare data for bar chart (exclude revenue)
    const barData = stats?.filter((s) => s.label !== "Total Revenue");

    // Prepare data for revenue chart
    const revenueData = [
        {
            name: "Revenue",
            value: stats?.find((s) => s.label === "Total Revenue")?.value ?? 0,
        },
    ];

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-8 mb-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                    <h1 className="text-xl md:text-4xl font-extrabold mb-2">
                        Welcome back <br />
                        <span className="text-primary font-semibold">
                            {user?.displayName ?? "User"}
                        </span>
                        <br />
                    </h1>
                    <p className="text-accent max-w-md">
                        {role === "admin"
                            ? "Here's a quick overview of your platform's performance and user activity."
                            : "Welcome to the dashboard"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {role === "admin" &&
                        stats?.map(({ label, value }) => (
                            <div
                                key={label}
                                className="bg-base-100 cursor-pointer shadow-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-secondary/30 rounded-lg px-5 py-4 flex flex-col items-center text-center">
                                <span className="text-3xl font-extrabold text-primary">
                                    {label === "Total Revenue"
                                        ? `$${value?.toLocaleString()}`
                                        : value ?? 0}
                                </span>
                                <span className="text-sm mt-1 opacity-90">
                                    {label}
                                </span>
                            </div>
                        ))}
                </div>
            </div>

            {/* Bar Chart for Total Users & Meals Served */}
            {role === "admin" && barData?.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4 text-center text-primary">
                        Users & Meals Served
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 20,
                                }}
                                barCategoryGap="30%">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        borderRadius: "8px",
                                        border: "none",
                                    }}
                                    labelStyle={{
                                        color: "#f59e0b",
                                        fontWeight: "bold",
                                    }}
                                    itemStyle={{ color: "#fff" }}
                                />
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

            {/* Radial Chart for Total Revenue */}
            {role === "admin" && (
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4 text-center text-primary">
                        Total Revenue
                    </h3>
                    <div className="h-72 w-full flex justify-center items-center">
                        <ResponsiveContainer width="50%" height="100%">
                            <RadialBarChart
                                innerRadius="70%"
                                outerRadius="100%"
                                data={revenueData}
                                startAngle={180}
                                endAngle={0}>
                                <RadialBar
                                    dataKey="value"
                                    cornerRadius={10}
                                    fill="#f59e0b"
                                />
                                <Legend
                                    iconSize={0}
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="center"
                                    formatter={() =>
                                        `$${revenueData[0]?.value?.toLocaleString()}`
                                    }
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
