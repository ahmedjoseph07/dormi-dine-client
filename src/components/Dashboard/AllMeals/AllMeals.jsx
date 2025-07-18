import React, { useState } from "react";
import { useNavigate } from "react-router";
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

const Meals = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [editingMeal, setEditingMeal] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [sortBy, setSortBy] = useState("");


    // Fetch meals
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals",sortBy],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/meals?sortBy=${sortBy}`);
            return res.data;
        },
    });

    // Delete meal
    const deleteMeal = useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/api/meals/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["meals"]);
            Swal.fire("Deleted!", "The meal has been deleted.", "warning");
        },
    });

    // Update meal
    const updateMeal = useMutation({
        mutationFn: async ({ id, title }) => {
            await axiosInstance.patch(`/api/meals/${id}`, { title });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["meals"]);
            setEditingMeal(null);
            Swal.fire("Updated!", "The meal has been updated.", "success");
        },
        onError: () => {
            Swal.fire("Error", "The meal has not been updated.", "failed");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            customClass: {
                confirmButton: "btn btn-secondary mr-2",
                cancelButton: "btn btn-accent",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMeal.mutate(id);
            }
        });
    };
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleUpdate = async () => {
        const formData = {
            title: updatedTitle,
            category: editingMeal.category,
            ingredients:
                typeof editingMeal.ingredients === "string"
                    ? editingMeal.ingredients
                        .split(",")
                        .map((ing) => ing.trim())
                        .filter(Boolean)
                    : editingMeal.ingredients,
            price: editingMeal.price,
            postTime: editingMeal.postTime,
            description: editingMeal.description,
            distributor: editingMeal.distributor,
            email: editingMeal.email,
        };

        // handle image upload if new image file exists
        if (editingMeal.newImageFile) {
            const imageData = new FormData();
            imageData.append("file", editingMeal.newImageFile);
            imageData.append("upload_preset", uploadPreset);

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    {
                        method: "POST",
                        body: imageData,
                    }
                );

                const data = await res.json();
                formData.image = data.secure_url;
            } catch (err) {
                console.error("Image upload failed", err);
                return Swal.fire("Error", "Image upload failed", "error");
            }
        }

        try {
            const response = await axiosInstance.patch(
                `/api/meals/${editingMeal._id}`,
                formData
            );
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Meal Updated",
                showConfirmButton: false,
                timer: 1500,
            });
            queryClient.invalidateQueries(["meals"]);
            setEditingMeal(null);
        } catch (err) {
            console.error(err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Meal Updatation Failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-primary">Meals</h2>

                <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered cursor-pointer focus:outline-none max-w-xs">
                    <option disabled>Sort by</option>
                    <option value="likes">Likes (High to Low)</option>
                    <option value="reviews">Reviews (High to Low)</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Rating</th>
                            <th>Distributor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, i) => (
                            <tr key={meal._id}>
                                <td>{meal.title}</td>
                                <td>{meal.likes}</td>
                                <td>{meal.reviewsCount}</td>
                                <td>{meal.rating}</td>
                                <td>{meal.distributorName}</td>
                                <td className="flex flex-wrap gap-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => {
                                            setEditingMeal(meal);
                                            setUpdatedTitle(meal.title);
                                        }}>
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleDelete(meal._id)}>
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-sm btn-accent"
                                        onClick={() =>
                                            navigate(`/meals/${meal._id}`)
                                        }>
                                        View Meal
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {editingMeal && (
                <div className="fixed inset-0  bg-opacity-60 flex justify-center items-center z-100 p-4">
                    <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 w-full max-w-3xl space-y-4">
                        <h3 className="text-xl font-bold text-primary mb-2">
                            Update Meal
                        </h3>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(); // <-- You must update this to handle all fields
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaUtensils />
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) =>
                                        setUpdatedTitle(e.target.value)
                                    }
                                    placeholder="Title"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaTag />
                                <input
                                    type="text"
                                    value={editingMeal.category || ""}
                                    onChange={(e) =>
                                        setEditingMeal({
                                            ...editingMeal,
                                            category: e.target.value,
                                        })
                                    }
                                    placeholder="Category"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full col-span-1 sm:col-span-2">
                                <FaList />
                                <input
                                    type="text"
                                    value={editingMeal.ingredients || ""}
                                    onChange={(e) =>
                                        setEditingMeal({
                                            ...editingMeal,
                                            ingredients: e.target.value,
                                        })
                                    }
                                    placeholder="Ingredients (comma separated)"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaDollarSign />
                                <input
                                    type="number"
                                    value={editingMeal.price || ""}
                                    onChange={(e) =>
                                        setEditingMeal({
                                            ...editingMeal,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                    placeholder="Price"
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaClock />
                                <input
                                    type="datetime-local"
                                    value={editingMeal.postTime || ""}
                                    onChange={(e) =>
                                        setEditingMeal({
                                            ...editingMeal,
                                            postTime: e.target.value,
                                        })
                                    }
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaUser />
                                <input
                                    readOnly
                                    value={
                                        editingMeal.distributorName ||
                                        "Admin User"
                                    }
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <label className="border p-2 rounded flex items-center gap-2 w-full">
                                <FaEnvelope />
                                <input
                                    readOnly
                                    value={
                                        editingMeal.distributorEmail ||
                                        "admin@example.com"
                                    }
                                    className="grow outline-none bg-transparent"
                                />
                            </label>

                            <textarea
                                value={editingMeal.description || ""}
                                onChange={(e) =>
                                    setEditingMeal({
                                        ...editingMeal,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Description"
                                className="border-1 md:w-1/2 h-28 p-2 outline-0 rounded col-span-1 sm:col-span-2"
                            />

                            <label className="col-span-1 sm:col-span-2">
                                <span className="text-sm font-medium mb-1 block">
                                    Upload New Image
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setEditingMeal({
                                            ...editingMeal,
                                            newImageFile: e.target.files[0],
                                        })
                                    }
                                    className="file-input file-input-bordered w-full"
                                />
                            </label>

                            <div className="flex justify-end gap-2 col-span-1 sm:col-span-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setEditingMeal(null)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Meals;
