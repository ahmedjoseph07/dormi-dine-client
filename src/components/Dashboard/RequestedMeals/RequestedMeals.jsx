import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../api/axiosInstance";
import Spinner from "../../Spinner/Spinner";
import Swal from "sweetalert2";

const RequestedMeals = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userEmail = user?.email;

    const {
        data: requestedMeals = [],
        isLoading: isMealLoading,
        isError,
    } = useQuery({
        queryKey: ["requestedMeals", userEmail],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/api/requested-meals?email=${userEmail}`
            );
            return res.data;
        },
        enabled: !!userEmail,
    });

    const { mutate: cancelMeal } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.patch(
                `/api/requested-meals/${id}/cancel`
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["requestedMeals", userEmail]);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Meal Request Cancelled",
                showConfirmButton: false,
                timer: 1500,
            });
        },
        onError: (error) => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to Cancel",
                text: error?.response?.data?.message || "Something went wrong!",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    if (isMealLoading) return <Spinner />;
    // console.log(requestedMeals);

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Requested Meals
            </h2>
            <div className="overflow-x-auto">
                {requestedMeals.length === 0 ? (
                    <p className="text-center text-lg text-gray-500 mt-6">
                        No meal requests found.
                    </p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Likes</th>
                                <th>Review Count</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedMeals.map((meal, i) => (
                                <tr key={i}>
                                    <td>{meal.title}</td>
                                    <td>{meal.likes}</td>
                                    <td>{meal.reviews}</td>
                                    <td>
                                        <span className="badge p-4 flex justify-center items-center">
                                            {meal.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-accent btn-sm"
                                            disabled={
                                                meal.status === "cancelled"
                                            }
                                            onClick={() =>
                                                cancelMeal(meal._id)
                                            }>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default RequestedMeals;
