import React from "react";
import { Link } from "react-router";
import { FaStar, FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import Spinner from "../../components/Spinner/Spinner";

const FeaturedMeals = () => {
    // Fetch meals from API
    const {
        data: meals = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["featuredMeals"],
        queryFn: async () => {
            const res = await axiosInstance("/api/meals");
            return res.data;
        },
    });

    if (isLoading) return <Spinner />;
    if (isError)
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load featured meals.
            </div>
        );

    // Sort by latest and pick top 3
    const latestMeals = meals
        .sort((a, b) => new Date(b.postTime) - new Date(a.postTime))
        .slice(0, 3);

    return (
        <div className="bg-base-200 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    Featured Meals
                </h2>
                <p className="text-center text-accent max-w-xl mx-auto mb-12">
                    Handpicked dishes loved by students this week. Try them out
                    and give your feedback!
                </p>

                {/* Featured Meals Grid */}
                <AnimatePresence>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}>
                        {latestMeals.length === 0 ? (
                            <div className="col-span-full flex justify-center items-center mt-6">
                                <p className="text-accent text-xl mx-auto text-center">
                                    No Featured Meals Found
                                </p>
                            </div>
                        ) : (
                            latestMeals.map((meal, i) => (
                                <motion.div
                                    key={meal._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="card cursor-pointer bg-base-100 hover:shadow-xl rounded-xl shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300">
                                    <figure>
                                        <img
                                            src={meal.image}
                                            alt={meal.title}
                                            className="w-full h-48 object-cover rounded-t-xl"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h3 className="text-xl font-semibold text-neutral">
                                            {meal.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-accent mt-2">
                                            <span className="flex items-center gap-1">
                                                <FaStar className="text-yellow-500" />{" "}
                                                {meal.rating}
                                            </span>
                                            <span className="font-bold">
                                                ${meal.price}
                                            </span>
                                        </div>
                                        <div className="card-actions mt-4 justify-end">
                                            <Link
                                                to={`/meals/${meal._id}`}
                                                className="btn btn-secondary btn-sm flex items-center gap-1">
                                                <FaUtensils /> View Meal
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FeaturedMeals;
