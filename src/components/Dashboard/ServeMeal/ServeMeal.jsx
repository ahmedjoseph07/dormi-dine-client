import React from "react";

const ServeMeal = () => {
    const requests = [
        {
            title: "Beef Kebab",
            userEmail: "user1@example.com",
            userName: "Ali Hasan",
            status: "Pending",
        },
        {
            title: "Paneer Butter Masala",
            userEmail: "user2@example.com",
            userName: "Rumi Akter",
            status: "Pending",
        },
    ];

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Serve Meals
            </h2>

            <input
                type="text"
                placeholder="Search by username or email"
                className="border p-2 rounded w-full mb-4 bg-base-100"
            />

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
                        {requests.map((r, i) => (
                            <tr key={i}>
                                <td>{r.title}</td>
                                <td>{r.userEmail}</td>
                                <td>{r.userName}</td>
                                <td>
                                    <span className="badge badge-warning p-4 flex justify-center items-center">
                                        {r.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-primary">
                                        Serve
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

export default ServeMeal;
