import { FaClock, FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import mealImg from "../assets/meal.webp";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";
import Swal from "sweetalert2";

const UpcomingMealsPage = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userEmail = user?.email;

    // Data loading : UpcomingMeals
    const {
        data: upcomingMeals = [],
        isLoading: isUpcomingMealsLoading,
        isError,
    } = useQuery({
        queryKey: ["upcoming-meals"],
        queryFn: async () => {
            const res = await axiosInstance("/api/upcoming-meals");
            return res.data;
        },
    });

    const { data: loggedUser = {}, isLoading: isUserLoading } = useQuery({
        queryKey: ["logged-user", userEmail],
        enabled: !!userEmail,
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/user?email=${userEmail}`);
            return res.data;
        },
    });

    const isPremiumUser = loggedUser.package !== "free";
    // Like Btn Toggle
    const upcomingLikeMutation = useMutation({
        mutationFn: async (mealId) => {
            const res = await axiosInstance.post(
                `/api/upcoming-like/${mealId}`,
                {
                    email: userEmail,
                }
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["upcoming-meals"]);
        },
    });

    if (isUpcomingMealsLoading) return <Spinner />;
    if (isError)
        return (
            <p className="text-center text-red-500">
                Failed to upcoming load meal.
            </p>
        );

    return (
        <div className="bg-base-200 px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                    Upcoming Meals
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                    {upcomingMeals.length === 0 ? (
                        <div className="col-span-full flex justify-center items-center mt-6">
                            <p className="text-accent text-xl mx-auto text-center">
                                No Meals Found
                            </p>
                        </div>
                    ) : (
                        upcomingMeals.map((meal, i) => {
                            const hasLiked =
                                meal.isLikedBy?.includes(userEmail);
                            return (
                                <motion.div
                                    key={meal._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-secondary/30 transition-all duration-300">
                                    <img
                                        src={meal.image}
                                        alt={meal.title}
                                        className="w-full h-48 object-cover"
                                    />

                                    <div className="p-5 space-y-2">
                                        <h3 className="text-xl font-bold text-primary">
                                            {meal.title}
                                        </h3>
                                        <p className="text-sm text-accent">
                                            {meal.distributorName}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-neutral">
                                            <FaClock />
                                            <span>
                                                {new Date(
                                                    meal.postTime
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-2 text-warning">
                                                <FaStar />
                                                <span>{meal.rating}</span>
                                            </div>
                                            <button
                                                disabled={!isPremiumUser || !user}
                                                className={`btn btn-md flex items-center gap-1 ${
                                                    hasLiked
                                                        ? "btn-error text-white"
                                                        : "btn-outline"
                                                }`}
                                                title={
                                                    hasLiked ? "Unlike" : "Like"
                                                }
                                                onClick={() =>
                                                    upcomingLikeMutation.mutate(
                                                        meal._id
                                                    )
                                                }>
                                                {hasLiked ? (
                                                    <FaHeart />
                                                ) : (
                                                    <FaRegHeart />
                                                )}
                                                <span>{meal.likes}</span>
                                                {hasLiked ? "Liked" : "Like"}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealsPage;
