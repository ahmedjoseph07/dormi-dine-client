import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggleBtn = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="cursor-pointer border-none transition duration-300 ease-in-out flex items-center justify-center"
            aria-label="Toggle Theme">
            <AnimatePresence mode="wait">
            {theme === "light" ? (
                <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block"
                >
                    <BsFillMoonStarsFill className="w-6 h-6 text-primary" />
                </motion.span>
            ) : (
                <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block"
                >
                    <BsSunFill className="w-6 h-6 text-yellow-400" />
                </motion.span>
            )}
        </AnimatePresence>
        </button>
    );
};

export default ThemeToggleBtn;
