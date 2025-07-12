import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <form className="space-y-4 bg-base-100 border p-4 rounded-xl shadow border-accent">
            <h3 className="text-xl font-bold text-secondary mb-4">
                Add your reviews
            </h3>


            <div className="flex gap-2">
                {[...Array(5)].map((_, index) => {
                    const current = index + 1;
                    return (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-pointer">
                            <FaStar
                                size={28}
                                className={`transition-colors duration-200 ${
                                    current <= (hover || rating)
                                        ? "text-yellow-400"
                                        : "text-accent"
                                }`}
                                onMouseEnter={() => setHover(current)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(current)}
                            />
                        </motion.div>
                    );
                })}
            </div>

            <textarea
                className="border-t outline-0 border-accent p-3 rounded-lg w-full bg-base-200"
                rows="4"
                placeholder="Write your review here..."></textarea>

            <button type="button" className="btn btn-accent">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
