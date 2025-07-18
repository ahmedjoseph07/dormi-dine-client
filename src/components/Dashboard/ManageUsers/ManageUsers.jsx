import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import Swal from "sweetalert2";

const fetchUsers = async (search) => {
    const params = { role: "user" };
    if (search) params.search = search;
    const { data } = await axiosInstance.get("/api/admin/users", { params });
    return data;
};

const ManageUsers = () => {
    const [search, setSearch] = useState("");
    const queryClient = useQueryClient();

    const {
        data: users = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["users", search],
        queryFn: () => fetchUsers(search),
    });

    const makeAdmin = async (email) => {
        try {
            await axiosInstance.put(`/api/admin/users/${email}/make-admin`);
            queryClient.invalidateQueries(["users", search]);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Promoted to Admin",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Make Admin Failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Manage Users
            </h2>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username or email"
                className="border p-2 rounded outline-0 w-full mb-4"
            />

            {isLoading && (
                <p className="text-center text-info">Loading users...</p>
            )}
            {isError && (
                <p className="text-center text-error">Failed to fetch users.</p>
            )}

            {!isLoading && !isError && (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Package</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr key={i}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.package || "Free"}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => makeAdmin(u.email)}>
                                            Make Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
