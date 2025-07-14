import React from "react";

const dummyUsers = [
    { name: "Joseph Ahmed", email: "joseph@example.com", subscription: "Free" },
    { name: "Ayesha Khan", email: "ayesha@example.com", subscription: "Gold" },
    { name: "Rahim Uddin", email: "rahim@example.com", subscription: "Silver" },
    {
        name: "Tamanna Rahman",
        email: "tamanna@example.com",
        subscription: "Platinum",
    },
];

const ManageUsers = ({ users = dummyUsers }) => {
    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Manage Users
            </h2>
            <input
                type="text"
                placeholder="Search by username or email"
                className="border p-2 rounded outline-0 w-full mb-4"
            />
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Subscription</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={i}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.subscription}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary">
                                        Make Admin
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

export default ManageUsers;
