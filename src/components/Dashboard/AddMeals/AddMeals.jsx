import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaUtensils,
    FaTag,
    FaDollarSign,
    FaClock,
    FaUser,
    FaEnvelope,
    FaList,
} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../api/axiosInstance"

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", uploadPreset);

            const uploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const imageUrl = uploadRes.data.secure_url;

            const ingredientsArray = data.ingredients
                .split(",")
                .map((ing) => ing.trim())
                .filter((ing) => ing.length > 0);

            const meal = {
                title: data.title,
                category: data.category,
                ingredients: ingredientsArray,
                description: data.description,
                price: parseFloat(data.price),
                postTime: data.postTime,
                image: imageUrl,
                distributorName: user?.displayName || "Admin User",
                distributorEmail: user?.email || "admin@email.com",
                rating: 0,
                likes: 0,
                reviewsCount: 0,
                addedBy: user?.email,
            };

            await axiosInstance.post("/api/meals", meal);

            Swal.fire({
                icon: "success",
                title: "Meal Added",
                text: "Meal was added successfully!",
            });

            reset();
        } catch (error) {
            console.error("Error adding meal:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to add meal. Try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Add New Meal
            </h2>

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
                        {...register("category", { required: true })}
                        placeholder="Category"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full col-span-1 sm:col-span-2">
                    <FaList />
                    <input
                        {...register("ingredients", { required: true })}
                        placeholder="Ingredients (add by comma separated)"
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
                        {...register("postTime", { required: true })}
                        type="datetime-local"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaUser />
                    <input
                        value={user?.displayName || "Admin User"}
                        readOnly
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaEnvelope />
                    <input
                        value={user?.email || "admin@example.com"}
                        readOnly
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <textarea
                    {...register("description", { required: true })}
                    placeholder="Description"
                    className="border-1 md:w-1/2 h-30 p-2 outline-0 rounded col-span-1 sm:col-span-2"
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

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary col-span-1 sm:col-span-2 mt-2">
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AddMeal;
