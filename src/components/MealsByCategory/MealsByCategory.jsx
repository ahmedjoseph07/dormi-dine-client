import React, { useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import mealImg from "../../assets/meal.webp";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import { useMemo } from "react";
import Spinner from "../../components/Spinner/Spinner";

const MealsByCategory = () => {
    const [selectedTab, setSelectedTab] = useState("Breakfast");
    const categories = ["Breakfast", "Lunch", "Dinner", "All Meals"];

    // Data loading : Meals
    const {
        data: meals = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosInstance("/api/meals");
            return res.data;
        },
    });

    const mealsByCategory = useMemo(() => {
        const grouped = {
            Breakfast: [],
            Lunch: [],
            Dinner: [],
        };
        meals.forEach((meal) => {
            if (meal.category === "breakfast") grouped.Breakfast.push(meal);
            else if (meal.category === "lunch") grouped.Lunch.push(meal);
            else if (meal.category === "dinner") grouped.Dinner.push(meal);
        });
        grouped["All Meals"] = meals;
        return grouped;
    }, [meals]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load meals.
            </div>
        );
    }

    return (
        <div className="bg-base-200 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    Meals by Category
                </h2>
                <p className="text-center text-accent max-w-xl mx-auto mb-12">
                    Browse a wide variety of carefully curated meals—from
                    breakfast to dinner. We got exactly what you need with just
                    a few clicks.
                </p>

                {/* Tabs */}
                <div className="tabs justify-center mb-8 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedTab(cat)}
                            className={`tab tab-bordered text-sm md:text-xl hover:text-primary border py-0 md:border-t-secondary md:border-r-secondary md:mx-4 capitalize transition-all ${
                                selectedTab === cat
                                    ? "tab-active text-primary"
                                    : ""
                            }`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Meals Grid Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}>
                        {mealsByCategory[selectedTab].length === 0 ? (
                            <div className="col-span-full flex justify-center items-center mt-6">
                                <p className="text-accent text-xl mx-auto text-center">
                                    No Meals Found
                                </p>
                            </div>
                        ) : (
                            mealsByCategory[selectedTab].map((meal, i) => (
                                <motion.div
                                    key={meal._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="card cursor-pointer bg-base-100  hover:shadow-xl rounded-xl shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300">
                                    <figure>
                                        <img
                                            src={meal.image}
                                            alt={meal.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h3 className="text-xl font-semibold text-neutral">
                                            {meal.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-accent">
                                            <span className="flex items-center gap-1">
                                                <FaStar className="text-yellow-500" />
                                                Rating: {meal.rating}
                                            </span>
                                            <span className="font-bold">
                                                Price: ${meal.price}
                                            </span>
                                        </div>
                                        <div className="card-actions mt-4 justify-end">
                                            <Link
                                                to={`/meals/${meal._id}`}
                                                className="btn btn-secondary btn-sm">
                                                Details
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

export default MealsByCategory;
