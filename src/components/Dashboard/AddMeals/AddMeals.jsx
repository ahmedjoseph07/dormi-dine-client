import React from "react";
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

const AddMeal = ({ admin }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Image upload todo
    };

    return (
        <div
            className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Add New Meal
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaUtensils />
                    <input
                        {...register("title")}
                        placeholder="Title"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaTag />
                    <input
                        {...register("category")}
                        placeholder="Category"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full col-span-1 sm:col-span-2">
                    <FaList />
                    <input
                        {...register("ingredients")}
                        placeholder="Ingredients"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaDollarSign />
                    <input
                        {...register("price")}
                        placeholder="Price"
                        type="number"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaClock  className="pointer-events-none"/>
                    <input
                        {...register("postTime")}
                        type="datetime-local"
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaUser />
                    <input
                        value={admin?.name || "Admin User"}
                        readOnly
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <label className="border p-2 rounded flex items-center gap-2 w-full">
                    <FaEnvelope />
                    <input
                        value={admin?.email || "admin@example.com"}
                        readOnly
                        className="grow outline-none bg-transparent"
                    />
                </label>

                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="border-1 md:w-1/2  h-30 p-2 outline-0 rounded col-span-1 sm:col-span-2"
                />

                <input
                    {...register("image")}
                    type="file"
                    className="file-input file-input-bordered col-span-1 sm:col-span-2 focus:outline-0 "
                />

                <button
                    type="submit"
                    className="btn btn-primary col-span-1 sm:col-span-2 mt-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddMeal;
