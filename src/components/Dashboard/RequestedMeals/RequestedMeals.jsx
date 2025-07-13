import React from "react";

const requestedMeals = [
    { title: "Chicken Biryani", likes: 25, reviews: 10, status: "Pending" },
    { title: "Beef Burger", likes: 14, reviews: 5, status: "Approved" },
];

const RequestedMeals = () => {
    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Requested Meals
            </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
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
                                    <button className="btn btn-accent btn-sm">
                                        Cancel
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

export default RequestedMeals;
