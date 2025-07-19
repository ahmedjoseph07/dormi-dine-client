import React, { useState } from "react";
import CountUp from "react-countup";
import TypeWriter from "../../components/TypeWriter/TypeWriter";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";

const Banner = () => {
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    setLoading(true);
    setError("");
    try {
        const { data } = await axiosInstance.get(`/api/meals?search=${searchText}`);
        setResults(data);
    } catch (err) {
        setError("Failed to fetch meals");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="relative bg-base-200">
            <div className="relative py-12 sm:py-16 lg:py-20">
                <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
                        <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl">
                            Welcome to{" "}
                            <span className="text-primary">Dormi</span>Dine
                        </h1>

                        <p className="max-w-lg mx-auto mt-6 font-normal leading-7 text-accent">
                            Stay organized, keep track of your meals and
                            expenses, and enjoy hassle-free hostel management
                            with DormiDine.
                        </p>

                        <div className="mt-4 text-2xl">
                            <TypeWriter />
                        </div>

                        {/* Search Form */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="max-w-xl mx-auto mt-4">
                            <div className="mx-4 sm:mx-0">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiSearch className="text-xl" />
                                    </div>

                                    <input
                                        type="text"
                                        id="search"
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                handleSearchSubmit(e);
                                        }}
                                        placeholder="Search meals, rooms, or services..."
                                        className="block w-full py-3 pl-10 pr-4 text-base font-normal leading-7 border border-accent outline-0 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-secondary w-full sm:w-auto">
                                    <FiSearch className="text-xl" /> Search now
                                </button>
                            </div>
                        </form>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center justify-center gap-6 mt-6 sm:flex-row sm:gap-12">
                            <div className="cursor-pointer border px-6 py-4 border-accent rounded-xl shadow-xl hover:shadow-secondary/30 hover:scale-[1.02] transition-all duration-300">
                                <p className="text-4xl font-bold text-accent">
                                    <CountUp
                                        end={999}
                                        duration={4}
                                        separator=","
                                    />
                                    +
                                </p>
                                <p className="mt-2 text-sm font-medium text-neutral">
                                    Meals Served
                                </p>
                            </div>

                            <div className="cursor-pointer border px-6 py-4 border-accent rounded-xl shadow-xl hover:shadow-secondary/30 hover:scale-[1.02] transition-all duration-300">
                                <p className="text-4xl font-bold text-accent">
                                    <CountUp
                                        end={350}
                                        duration={4}
                                        separator=","
                                    />
                                    +
                                </p>
                                <p className="mt-2 text-sm font-medium text-neutral">
                                    Residents
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Search Results Section */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
                {loading && (
                    <p className="text-center text-accent font-semibold">
                        Searching...
                    </p>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && results.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((meal) => (
                                <div
                                    key={meal._id}
                                    className="p-4 cursor-pointer rounded-xl shadow-xl bg-base-100 hover:shadow-secondary/30 transition duration-300">
                                    <h3 className="text-lg font-bold text-primary">
                                        {meal.title}
                                    </h3>
                                    <p className="text-md text-accent mt-1">
                                        {meal.description}
                                    </p>
                                    <p className="mt-2">
                                    Posted at : {new Date(meal.postTime).toLocaleString()}
                                    </p>
                                    <p className="text-secondary font-bold mt-2">
                                        Price: ${meal.price}
                                    </p>
                                    
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {!loading && results.length === 0 && searchText && (
                    <p className="text-center text-accent mt-4">
                        No meals found for "{searchText}".
                    </p>
                )}
            </div>
        </div>
    );
};

export default Banner;
