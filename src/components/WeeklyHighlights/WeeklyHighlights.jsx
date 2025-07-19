import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const highlights = [
    { day: "Sunday", message: "Chef's Special Chicken Roast 🍗" },
    { day: "Monday", message: "Fresh Veg Buffet 🌱" },
    { day: "Tuesday", message: "Live Cooking Night 🍳" },
    { day: "Wednesday", message: "Mutton Korma Festival 🐑" },
    { day: "Thursday", message: "Boarder Birthday Shoutouts 🎂" },
    { day: "Friday", message: "Cleanliness Inspection 🚿" },
    { day: "Saturday", message: "Feedback & Game Night 🎮" },
];

const WeeklyHighlights = () => {
    const [index, setIndex] = useState(0);

    const nextHighlight = () => {
        setIndex((prev) => (prev + 1) % highlights.length);
    };

    return (
        <div className="bg-base-200 py-16 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-8">
                    Dormi Weekly Highlights
                </h2>

                <p className="text-center text-accent max-w-xl mx-auto mb-12">
                    Don’t miss out on our most-loved meals of the week!
                    Handpicked by your fellow residents and updated weekly.
                </p>

                <div className="max-w-xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={highlights[index].day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-base-100 px-6 py-8 rounded-2xl shadow-xl hover:shadow-primary/30">
                            <h3 className="text-xl font-bold text-neutral mb-2">
                                {highlights[index].day}
                            </h3>
                            <p className="text-accent text-sm">
                                {highlights[index].message}
                            </p>
                            <button
                                onClick={nextHighlight}
                                className="btn btn-secondary btn-sm mt-6">
                                Next Day →
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default WeeklyHighlights;
