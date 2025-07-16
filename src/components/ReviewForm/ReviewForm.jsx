import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ReviewForm = ({ mealId }) => {
    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        if (!rating || !data.comment.trim()) {
            setError("Please provide both rating and comment.");
            await Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Please provide both rating and comment.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await axiosInstance.post("/api/add-review", {
                mealId,
                name: user?.displayName || "Anonymous",
                email: user?.email,
                comment: data.comment,
                rating,
            });
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Review added",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            reset();
            setRating(0);
            setHover(0);
            queryClient.invalidateQueries(["reviews", mealId]);
        } catch (err) {
            console.error("Review submission failed:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-base-100 border p-4 rounded-xl shadow border-accent">
            <h3 className="text-xl font-bold text-secondary mb-4">
                Add your reviews
            </h3>

            {/* Rating Input */}
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

            {/* Comment Box */}
            <textarea
                {...register("comment", { required: true })}
                className="border-t outline-0 border-accent p-3 rounded-lg w-full bg-base-200"
                rows="4"
                placeholder="Write your review here..."></textarea>

            <button
                disabled={loading || rating === 0}
                type="submit"
                className="btn btn-accent">
                {loading ? "Submitting..." : "Submit Review"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
};

export default ReviewForm;
