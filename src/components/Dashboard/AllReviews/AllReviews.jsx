import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import Spinner from "../../Spinner/Spinner";

const AllReviews = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosInstance.get("/api/all-reviews");
            return res.data;
        },
    });

    const deleteReview = useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/api/reviews/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"]);
            Swal.fire("Deleted!", "Review deleted successfully", "success");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the review.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReview.mutate(id);
            }
        });
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                All Reviews
            </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Total Reviews</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(reviews)}
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td>{review.mealTitle}</td>
                                <td>{review.likes}</td>
                                <td>{review.reviewsCount}</td>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                                <td className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-sm btn-secondary">
                                        Delete
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate(`/meals/${review.mealId}`)
                                        }
                                        className="btn btn-sm btn-accent">
                                        View Meal
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;
