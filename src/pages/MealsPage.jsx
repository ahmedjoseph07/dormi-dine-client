import { useState } from "react";
import { FaSearch, FaStar, FaUtensils, FaClock } from "react-icons/fa";
// import InfiniteScroll from "react-infinite-scroll-component";
import mealImg from "../assets/meal.webp";
import { Link } from "react-router";
import Spinner from "../components/Spinner/Spinner";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


const categories = ["All (Category) ", "Breakfast", "Lunch", "Dinner"];
const prices = ["All (Price)", "Below 80", "80-120", "Above 120"];

const MealsPage = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");

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

    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full px-3 text-base font-normal leading-7 border border-accent outline-0 rounded-md"
                        />
                        <button className="btn btn-primary ml-2">
                            <FaSearch />
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <select
                            className="select cursor-pointer focus:outline-none focus:ring-0"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }>
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            className="select cursor-pointer focus:outline-none focus:ring-0"
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}>
                            {prices.map((range) => (
                                <option key={range}>{range}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* <InfiniteScroll
                    dataLength={dummyMeals.length}
                    next={() => {}}
                    hasMore={true}
                    loader={
                        <p className="text-center mt-4">
                            <Spinner />
                        </p>
                    }> */}
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                    Meals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {meals.map((meal, i) => (
                        <motion.div
                            key={meal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-base-100 cursor-pointer rounded-xl transition-all duration-300  hover:scale-[1.02] shadow-xl hover:shadow-primary/20">
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-bold text-primary">
                                    {meal.title}
                                </h3>
                                <p className="text-sm text-neutral">
                                    Distributor: {meal.distributor}
                                </p>
                                <div className="flex items-center justify-between text-sm mt-2">
                                    <span className="flex items-center gap-1 text-warning">
                                        <FaStar />
                                        {meal.rating}
                                    </span>
                                    <span className="flex items-center gap-1 text-accent">
                                        <FaClock />
                                        {meal.postTime}
                                    </span>
                                </div>
                                <Link
                                    to={`/meal/${meal.id}`}
                                    className="btn btn-sm btn-secondary w-full mt-3">
                                    <FaUtensils className="mr-1" />
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* </InfiniteScroll> */}
            </div>
        </div>
    );
};

export default MealsPage;
