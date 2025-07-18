import { useState } from "react";
import { FaSearch, FaStar, FaUtensils, FaClock } from "react-icons/fa";
// import InfiniteScroll from "react-infinite-scroll-component";
import mealImg from "../assets/meal.webp";
import { Link } from "react-router";
import Spinner from "../components/Spinner/Spinner";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const categories = ["All", "Breakfast", "Lunch", "Dinner"];
const prices = ["All", "Below 80", "80-120", "Above 120"];

const MealsPage = () => {
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");

    // Data loading : Meals
    const {
        data: meals = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["meals", search, selectedCategory, selectedPrice],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (search) params.append("search", search);
            if (selectedCategory !== "All")
                params.append("category", selectedCategory);
            if (selectedPrice !== "All")
                params.append("priceRange", selectedPrice);
            const res = await axiosInstance(`/api/meals?${params.toString()}`);
            return res.data;
        },
    });

    console.log(meals)
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearch(""); 
        setSearchInput(""); 
    };

    const handlePriceChange = (price) => {
        setSelectedPrice(price);
        setSearch("");
        setSearchInput("");
    };

    if (isLoading) return <Spinner />;
    if (isError) return <p className="text-red-500">Failed to load meals.</p>;

    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="block w-full px-3 text-base font-normal leading-7 border border-accent outline-0 rounded-md"
                        />
                        <button
                            className="btn btn-primary ml-2"
                            onClick={() => setSearch(searchInput)}>
                            <FaSearch />
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <select
                            className="select cursor-pointer focus:outline-none focus:ring-0"
                            value={selectedCategory}
                            onChange={(e) =>
                                handleCategoryChange(e.target.value)
                            }>
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            className="select cursor-pointer focus:outline-none focus:ring-0"
                            value={selectedPrice}
                            onChange={(e) => handlePriceChange(e.target.value)}>
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
                            key={i}
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
                                    Meal Distributor: {meal.distributorName}
                                </p>
                                <p className="text-sm text-neutral">
                                    Price: ${meal.price}
                                </p>
                                <div className="flex items-center justify-between text-sm mt-2">
                                    <span className="flex items-center gap-1 text-warning">
                                        <FaStar />
                                        {meal.rating}
                                    </span>
                                    <span className="flex items-center gap-1 text-accent">
                                        <FaClock />
                                        {new Date(
                                            meal.postTime
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <Link
                                    to={`/meals/${meal._id}`}
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
