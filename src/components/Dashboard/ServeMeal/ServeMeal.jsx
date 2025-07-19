import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import Spinner from "../../Spinner/Spinner";

const fetchRequestedMeals = async (search) => {
    const params = {};
    if (search) params.search = search;

    const { data } = await axiosInstance.get("/api/requested-meals", {
        params,
    });

    return data;
};

const ServeMeal = () => {
    const [search, setSearch] = useState("");
    const queryClient = useQueryClient();

    const {
        data: requests = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["requested-meals", search],
        queryFn: () => fetchRequestedMeals(search),
    });

    const serveMealMutation = useMutation({
        mutationFn: async (id) => {
            await axiosInstance.patch(`/api/requested-meals/${id}/serve`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["requested-meals", search]);
            Swal.fire({
                title: "Meal Served",
                text: "Meal Served Succesfully",
                icon: "success",
                showCancelButton: false,
                timer: 1500
            });
        },
    });

    const handleServe = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Mark this meal as served?",
            icon: "question",
            showCancelButton: false,
            confirmButtonText: "Yes, Serve",
            customClass: {
                confirmButton: "btn btn-primary mr-2",
                cancelButton: "btn btn-secondary",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                serveMealMutation.mutate(id);
            }
        });
    };

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Serve Meals
            </h2>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username or email"
                className="input input-bordered focus:outline-0 w-full mb-4"
            />

            {isLoading && <Spinner />}
            {isError && (
                <p className="text-center text-error">
                    Failed to fetch requested meals.
                </p>
            )}

            {!isLoading && !isError && (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Meal Title</th>
                                <th>User Email</th>
                                <th>User Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-10 text-center text-accent text-lg">
                                        No Meal Served Yet
                                    </td>
                                </tr>
                            ) : (
                                requests.map((r) => (
                                    <tr key={r._id}>
                                        <td>{r.title}</td>
                                        <td>{r.email}</td>
                                        <td>{r.name}</td>
                                        <td>
                                            <span
                                                className={`badge p-4 ${
                                                    r.status === "served"
                                                        ? "badge-success"
                                                        : "badge-warning"
                                                }`}>
                                                {r.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleServe(r._id)
                                                }
                                                disabled={
                                                    r.status === "cancelled" || r.status === "served" 
                                                }
                                                className="btn btn-sm btn-primary">
                                                Serve
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ServeMeal;
