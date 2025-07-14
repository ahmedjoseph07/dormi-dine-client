import React, { useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import mealImg from "../../assets/meal.webp";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import { useMemo } from "react";
import Spinner from "../../components/Spinner/Spinner"
// const mealsByCategory = {
//     Breakfast: [
//         {
//             _id: "1",
//             title: "Pancakes & Berries",
//             price: 120,
//             rating: 4.8,
//             image: mealImg,
//         },
//         {
//             _id: "2",
//             title: "Omelette Special",
//             price: 90,
//             rating: 4.5,
//             image: mealImg,
//         },
//         {
//             _id: "3",
//             title: "Toast & Juice",
//             price: 80,
//             rating: 4.3,
//             image: mealImg,
//         },
//     ],
//     Lunch: [
//         {
//             _id: "4",
//             title: "Grilled Chicken",
//             price: 180,
//             rating: 4.7,
//             image: mealImg,
//         },
//         {
//             _id: "5",
//             title: "Veggie Rice Bowl",
//             price: 150,
//             rating: 4.4,
//             image: mealImg,
//         },
//         {
//             _id: "6",
//             title: "Beef Curry",
//             price: 200,
//             rating: 4.6,
//             image: mealImg,
//         },
//     ],
//     Dinner: [
//         {
//             _id: "7",
//             title: "Spaghetti Bolognese",
//             price: 160,
//             rating: 4.9,
//             image: mealImg,
//         },
//         {
//             _id: "8",
//             title: "Butter Naan with Paneer",
//             price: 130,
//             rating: 4.5,
//             image: mealImg,
//         },
//         {
//             _id: "9",
//             title: "Fried Rice & Chicken",
//             price: 170,
//             rating: 4.6,
//             image: mealImg,
//         },
//     ],
// };

// mealsByCategory["All Meals"] = Object.values(mealsByCategory).flat();

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
            const res = await axiosInstance("/meals");
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
            if (meal.category === "Breakfast") grouped.Breakfast.push(meal);
            else if (meal.category === "Lunch") grouped.Lunch.push(meal);
            else if (meal.category === "Dinner") grouped.Dinner.push(meal);
        });
        grouped["All Meals"] = meals;
            return grouped;
    }, [meals]);

    if (isLoading) {
        return (
            <Spinner/>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load meals.
            </div>
        );
    }


    return (
        <div className="py-12 bg-base-200 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    Meals by Category
                </h2>

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
                        {mealsByCategory[selectedTab].map((meal, i) => (
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
                                            {meal.rating}
                                        </span>
                                        <span className="font-bold">
                                            ৳ {meal.price}
                                        </span>
                                    </div>
                                    <div className="card-actions mt-4 justify-end">
                                        <Link
                                            to={`/meal/${meal._id}`}
                                            className="btn btn-secondary btn-sm">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MealsByCategory;
