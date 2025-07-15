import { FaClock, FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import mealImg from "../assets/meal.webp";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

// const upcomingMeals = [
//     {
//         id: 1,
//         title: "Beef Tehari",
//         distributor: "Hall 2 Kitchen",
//         image: "https://source.unsplash.com/featured/?beef,tehari",
//         time: "Tomorrow at 1:00 PM",
//         rating: 4.2,
//         likes: 68,
//     },
//     {
//         id: 2,
//         title: "Grilled Fish & Rice",
//         distributor: "Hall 4 Kitchen",
//         image: "https://source.unsplash.com/featured/?grilled,fish",
//         time: "Next Sunday at 8:00 PM",
//         rating: 4.8,
//         likes: 94,
//     },
//     {
//         id: 3,
//         title: "Vegetable Pulao",
//         distributor: "Hall 1 Kitchen",
//         image: "https://source.unsplash.com/featured/?vegetable,pulao",
//         time: "Friday at 2:00 PM",
//         rating: 3.9,
//         likes: 32,
//     },
// ];

const isPremiumUser = true;

const UpcomingMealsPage = () => {


    // Data loading : UpcomingMeals
    const {
        data: upcomingMeals = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["upcoming-meals"],
        queryFn: async () => {
            const res = await axiosInstance("/upcoming-meals");
            return res.data;
        },
    });


    return (
        <div className="bg-base-200 px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                    Upcoming Meals
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                    {upcomingMeals.map((meal, i) => (
                        <motion.div
                            key={meal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-secondary/30 transition-all duration-300">
                            <img
                                src={mealImg}
                                alt={meal.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 space-y-2">
                                <h3 className="text-xl font-bold text-primary">
                                    {meal.title}
                                </h3>
                                <p className="text-sm text-accent">
                                    {meal.distributor}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-neutral">
                                    <FaClock />
                                    <span>{meal.time}</span>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-2 text-warning">
                                        <FaStar />
                                        <span>{meal.rating}</span>
                                    </div>
                                    {isPremiumUser && (
                                        <button
                                            className="btn btn-md flex items-center gap-1"
                                            title="Like this meal">
                                            {/* <FaHeart  /> */}
                                            <FaRegHeart />
                                            <span>{meal.likes}</span>
                                            likes
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealsPage;
