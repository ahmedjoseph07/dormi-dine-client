import React from "react";

const Meals = () => {
    const meals = [
        {
            title: "Grilled Chicken",
            likes: 28,
            reviews_count: 12,
            rating: 4.5,
            distributor: "Admin User",
        },
        {
            title: "Veggie Pasta",
            likes: 15,
            reviews_count: 5,
            rating: 4.1,
            distributor: "John Doe",
        },
    ];

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-primary">Meals</h2>

                <select className="select select-bordered cursor-pointer focus:outline-none focus:ring-0 max-w-xs">
                    <option disabled>
                        Sort by
                    </option>
                    <option value="likes">Likes (High to Low)</option>
                    <option value="reviews">Reviews (High to Low)</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Rating</th>
                            <th>Distributor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, i) => (
                            <tr key={i}>
                                <td>{meal.title}</td>
                                <td>{meal.likes}</td>
                                <td>{meal.reviews_count}</td>
                                <td>{meal.rating}</td>
                                <td>{meal.distributor}</td>
                                <td className="flex flex-wrap gap-2">
                                    <button className="btn btn-sm btn-primary">
                                        Update
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

export default Meals;
