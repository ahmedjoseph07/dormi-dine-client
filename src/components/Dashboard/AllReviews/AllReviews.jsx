import React from "react";

const AllReviews = () => {
    const reviews = [
        {
            mealTitle: "Chicken Biryani",
            likes: 22,
            reviews_count: 7,
        },
        {
            mealTitle: "Spicy Ramen",
            likes: 10,
            reviews_count: 3,
        },
    ];

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
                            <th>Reviews</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td>{review.mealTitle}</td>
                                <td>{review.likes}</td>
                                <td>{review.reviews_count}</td>
                                <td className="flex gap-2 flex-wrap">
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

export default AllReviews;
