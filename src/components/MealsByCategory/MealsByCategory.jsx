import React, { useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import mealImg from "../../assets/meal.webp";

const mealsByCategory = {
    Breakfast: [
        {
            _id: "1",
            title: "Pancakes & Berries",
            price: 120,
            rating: 4.8,
            image: mealImg,
        },
        {
            _id: "2",
            title: "Omelette Special",
            price: 90,
            rating: 4.5,
            image: mealImg,
        },
        {
            _id: "3",
            title: "Toast & Juice",
            price: 80,
            rating: 4.3,
            image: mealImg,
        },
    ],
    Lunch: [
        {
            _id: "4",
            title: "Grilled Chicken",
            price: 180,
            rating: 4.7,
            image: mealImg,
        },
        {
            _id: "5",
            title: "Veggie Rice Bowl",
            price: 150,
            rating: 4.4,
            image: mealImg,
        },
        {
            _id: "6",
            title: "Beef Curry",
            price: 200,
            rating: 4.6,
            image: mealImg,
        },
    ],
    Dinner: [
        {
            _id: "7",
            title: "Spaghetti Bolognese",
            price: 160,
            rating: 4.9,
            image: mealImg,
        },
        {
            _id: "8",
            title: "Butter Naan with Paneer",
            price: 130,
            rating: 4.5,
            image: mealImg,
        },
        {
            _id: "9",
            title: "Fried Rice & Chicken",
            price: 170,
            rating: 4.6,
            image: mealImg,
        },
    ],
};

mealsByCategory["All Meals"] = Object.values(mealsByCategory).flat();

const MealsByCategory = () => {
    const categories = Object.keys(mealsByCategory);
    const [selectedTab, setSelectedTab] = useState("Breakfast");

    return (
        <div className="py-12 bg-base-200 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">
                    Meals by Category
                </h2>

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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }} 
                        transition={{ duration: .6 }}>
                        {mealsByCategory[selectedTab].map((meal) => (
                            <div
                                key={meal._id}
                                className="card cursor-pointer bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
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
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MealsByCategory;
