import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import Spinner from "../../Spinner/Spinner";
import {
    FaUtensils,
    FaTag,
    FaList,
    FaDollarSign,
    FaClock,
    FaUser,
    FaEnvelope,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";


const UpcomingMeals = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const {user} = useAuth();

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    // Fetch upcoming meals
    const { data: upcomingMeals = [], isLoading } = useQuery({
        queryKey: ["upcomingMeals"],
        queryFn: async () => {
            const res = await axiosInstance.get("/api/upcoming-meals");
            return res.data;
        },
    });

    // Add upcoming meal
    const addMeal = useMutation({
        mutationFn: async (mealData) => {
            return axiosInstance.post("/api/upcoming-meals", mealData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["upcomingMeals"]);
            setShowModal(false);
            reset();
            Swal.fire("Added!", "Upcoming meal added.", "success");
        },
    });

    // Publish to meals
    const publishMeal = useMutation({
        mutationFn: async (meal) => {
            await axiosInstance.post("/api/meals", meal);
            await axiosInstance.delete(`/api/upcoming-meals/${meal._id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["upcomingMeals"]);
            Swal.fire("Published!", "Meal is now live.", "success");
        },
    });

    // On form submit
    const onSubmit = async (data) => {
        let imageUrl = "";

        // Upload image to Cloudinary
        const imageData = new FormData();
        imageData.append("file", data.image[0]);
        imageData.append("upload_preset", uploadPreset);

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: imageData,
                }
            );
            const imgRes = await res.json();
            imageUrl = imgRes.secure_url;
        } catch (err) {
            console.error("Image upload failed", err);
            return Swal.fire("Error", "Image upload failed", "error");
        }

        // Prepare final data
        const mealData = {
            title: data.title,
            category: data.category,
            ingredients: data.ingredients
                .split(",")
                .map((ing) => ing.trim())
                .filter(Boolean),
            description: data.description,
            price: parseFloat(data.price),
            postTime: data.postTime,
            image: imageUrl,
            distributorName: user?.displayName || "Admin User",
            distributorEmail: user?.email || "admin@example.com",
            addedBy: user?.email || "admin@example.com",
            rating: 0,
            likes: 0,
            reviewsCount: 0,
            isLikedBy: [],
            isRequestedBy: [],
        };

        addMeal.mutate(mealData);
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-primary">
                    Upcoming Meals
                </h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}>
                    Add Upcoming Meal
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Distributor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingMeals.map((meal) => (
                            <tr key={meal._id}>
                                <td>{meal.title}</td>
                                <td>{meal.category}</td>
                                <td>৳{meal.price}</td>
                                <td>{meal.distributorName}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-accent"
                                        onClick={() =>
                                            publishMeal.mutate(meal)
                                        }>
                                        Publish
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                    <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 w-full max-w-3xl space-y-4">
                        <h3 className="text-xl font-bold text-primary mb-4">
                            ➕ Add Upcoming Meal
                        </h3>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaUtensils />
                                <input
                                    {...register("title", { required: true })}
                                    placeholder="Title"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaTag />
                                <input
                                    {...register("category", {
                                        required: true,
                                    })}
                                    placeholder="Category"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full col-span-1 sm:col-span-2">
                                <FaList />
                                <input
                                    {...register("ingredients", {
                                        required: true,
                                    })}
                                    placeholder="Ingredients (comma separated)"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaDollarSign />
                                <input
                                    {...register("price", { required: true })}
                                    placeholder="Price"
                                    type="number"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaClock />
                                <input
                                    {...register("postTime", {
                                        required: true,
                                    })}
                                    type="datetime-local"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaUser />
                                <input
                                    readOnly
                                    value={user?.displayName || "Admin User"}
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaEnvelope />
                                <input
                                    readOnly
                                    value={user?.email || "admin@example.com"}
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <textarea
                                {...register("description", { required: true })}
                                placeholder="Description"
                                className="border-1 md:w-1/2 h-28 p-2 outline-0 rounded col-span-1 sm:col-span-2"
                            />

                            <label className="col-span-1 sm:col-span-2">
                                <span className="text-sm font-medium mb-1 block">
                                    Upload Image
                                </span>
                                <input
                                    {...register("image", { required: true })}
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                />
                            </label>

                            <div className="flex justify-end gap-2 col-span-1 sm:col-span-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary">
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpcomingMeals;
