import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaList } from "react-icons/fa";
import Spinner from "../../Spinner/Spinner";

const MyReviews = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [editingReview, setEditingReview] = useState(null);
    const [updatedText, setUpdatedText] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["myReviews", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/api/user-reviews?email=${user.email}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    const deleteReview = useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/api/reviews/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myReviews"]);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Review Deleted",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    const updateReview = useMutation({
        mutationFn: async ({ id, comment, rating }) => {
            await axiosInstance.patch(`/api/reviews/${id}`, {
                comment,
                rating,
            });
        },
        onSuccess: () => {
            setEditingReview(null);
            queryClient.invalidateQueries(["myReviews"]);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Review Updated",
                showConfirmButton: false,
                timer: 1500,
            });
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
                confirmButton: "btn btn-secondary  mr-2",
                cancelButton: "btn btn-accent",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReview.mutate(id);
            }
        });
    };

    const handleUpdate = () => {
        if (updatedText.trim()) {
            updateReview.mutate({
                id: editingReview._id,
                comment: updatedText,
                rating: parseFloat(updatedRating),
            });
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">My Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-accent">No reviews found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Meal Title</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((r, i) => (
                                <tr key={r._id}>
                                    <td>{i + 1}</td>
                                    <td>{r.title}</td>
                                    <td>{r.rating}</td>
                                    <td>{r.comment}</td>
                                    <td className="flex gap-2 flex-wrap">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => {
                                                setEditingReview(r);
                                                setUpdatedText(r.comment);
                                                setUpdatedRating(r.rating);
                                            }}>
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => handleDelete(r._id)}>
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-sm btn-accent"
                                            onClick={() =>
                                                navigate(`/meals/${r.mealId}`)
                                            }>
                                            View Meal
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingReview && (
                <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 w-full max-w-md space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <FaList /> Update Review
                        </h3>

                        <label className="border p-2 rounded flex items-center gap-2 w-full">
                            <textarea
                                value={updatedText}
                                onChange={(e) => setUpdatedText(e.target.value)}
                                placeholder="Your review"
                                className="grow outline-none bg-transparent"
                            />
                        </label>

                        <label className="border p-2 rounded flex items-center gap-2 w-full">
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={updatedRating}
                                onChange={(e) =>
                                    setUpdatedRating(e.target.value)
                                }
                                placeholder="Rating (1-5)"
                                className="grow outline-none bg-transparent"
                            />
                        </label>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setEditingReview(null)}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleUpdate}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
