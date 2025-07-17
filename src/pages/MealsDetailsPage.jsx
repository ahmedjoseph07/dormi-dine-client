import { motion } from "framer-motion";
import { useParams } from "react-router";
import {
    FaClock,
    FaHeart,
    FaStar,
    FaUtensils,
    FaUserAlt,
    FaRegHeart,
} from "react-icons/fa";
import mealImg from "../assets/meal.webp";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

const MealDetails = () => {
    const { mealId } = useParams();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userEmail = user.email;

    const likeMutation = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post(`/api/like/${mealId}`, {
                email: userEmail,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["mealDetails", mealId]);
        },
    });

    const {
        data: meal = {},
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["mealDetails", mealId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/meals/${mealId}`);
            return res.data;
        },
        enabled: !!mealId,
    });

    const { data: reviewsList = [], isLoading: isReviewsLoading } = useQuery({
        queryKey: ["reviews", mealId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/reviews/${mealId}`);
            return res.data;
        },
        enabled: !!mealId,
    });

    const hasLiked = meal?.isLikedBy?.includes(userEmail);

    if (isLoading) return <Spinner />;
    if (isError)
        return <p className="text-center text-red-500">Failed to load meal.</p>;

    const {
        title,
        image,
        distributor,
        description,
        ingredients = [],
        timestamp,
        likes,
    } = meal;

    return (
        <div className="min-h-screen py-12 px-4 bg-base-200">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl hover:shadow-primary/30 mx-auto bg-base-100 rounded-2xl shadow-xl p-6 md:p-10 space-y-6 ">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={image}
                        alt={title}
                        className="w-full md:w-1/2 rounded-2xl object-cover max-h-96 shadow-lg"
                    />
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl font-bold text-primary">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-accent">
                            <FaUserAlt /> <span>{distributor}</span>
                        </div>
                        <p className="text-neutral">{description}</p>
                        <div className="flex items-center gap-3 text-sm mt-2 text-neutral">
                            <FaClock />
                            <span>
                                Posted {new Date(timestamp).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1 text-error">
                                <FaHeart /> <span>{likes} Likes</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {ingredients.map((item, i) => (
                                <span
                                    key={i}
                                    className="badge cursor-pointer badge-outline badge-accent text-xs">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        className={`btn btn-md flex items-center gap-1 ${
                            hasLiked ? "btn-error text-white" : "btn-outline"
                        }`}
                        title={hasLiked ? "Unlike" : "Like"}
                        onClick={() => likeMutation.mutate()}>
                        {hasLiked ? <FaHeart /> : <FaRegHeart />}
                        <span>{likes}</span>
                        {hasLiked ? "Liked" : "Like"}
                    </button>
                    
                    <button className="btn btn-secondary">
                        <FaUtensils /> Request Meal
                    </button>
                </div>

                {/* Review List */}
                <div className="pt-6 border-t mt-6">
                    <h3 className="text-xl font-bold text-primary mb-4">
                        Reviews ({reviewsList.length})
                    </h3>

                    {isReviewsLoading ? (
                        <Spinner />
                    ) : reviewsList.length === 0 ? (
                        <p className="text-md text-accent mb-4">
                            No reviews yet.
                        </p>
                    ) : (
                        <div className="mt-6 space-y-4 mb-10">
                            {reviewsList.map((review) => (
                                <div
                                    key={review._id}
                                    className="bg-base-300 p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-neutral">
                                        {review.comment}
                                    </p>
                                    <p className="text-xs text-accent mt-2">
                                        @{review.name} | Rating:⭐{" "}
                                        {review.rating}/5
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    <ReviewForm mealId={mealId} />
                </div>
            </motion.div>
        </div>
    );
};

export default MealDetails;
