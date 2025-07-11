import React from "react";
import CountUp from "react-countup";
import TypeWriter from "../TypeWriter/TypeWriter";
import { FiSearch } from "react-icons/fi";

const Banner = () => {
    return (
        <div className="relative bg-base-200">
            <div className="relative py-12 bg-base-200 sm:py-16 lg:py-20">
                <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
                        <h1 className="text-3xl font-bold text-netralsm:text-4xl xl:text-5xl">
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

                        <form action="#" className="max-w-xl mx-auto mt-4">
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
                                        name="search"
                                        id="search"
                                        placeholder="Search meals, rooms, or services..."
                                        className="block w-full py-3 pl-10 pr-4 text-base font-normal leading-7 border border-accent outline-0 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-secondary">
                                    <FiSearch className="text-xl" /> Search now
                                </button>
                            </div>
                        </form>

                        {/* Stats */}
                        <div className="flex flex-col items-center justify-center gap-6 mt-6 sm:flex-row sm:gap-12">
                            <div className="cursor-pointer border px-6 py-4 rounded-2xl border-accent shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-accent/50">
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

                            <div className="cursor-pointer border px-6 py-4 rounded-2xl border-accent shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-accent/50">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
