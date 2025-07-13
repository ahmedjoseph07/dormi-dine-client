import React from "react";

const reviews = [
    {
        title: "Veg Pizza",
        likes: 8,
        review: "Delicious and fresh!",
    },
    {
        title: "Grilled Sandwich",
        likes: 3,
        review: "Too salty.",
    },
];

const MyReviews = () => {
    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">My Reviews</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r, i) => (
                            <tr key={i}>
                                <td>{r.title}</td>
                                <td>{r.likes}</td>
                                <td>{r.review}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-primary">
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-secondary">
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-accent">
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

export default MyReviews;
