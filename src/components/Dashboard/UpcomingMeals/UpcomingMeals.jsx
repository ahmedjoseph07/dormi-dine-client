import React from "react";
import {
    FaUtensils,
    FaList,
    FaLeaf,
    FaDollarSign,
} from "react-icons/fa";

const upcomingMeals = [
    {
        title: "Paneer Wrap",
        likes: 12,
        reviews: 3,
        status: "Upcoming",
    },
    {
        title: "Fruit Salad",
        likes: 8,
        reviews: 1,
        status: "Upcoming",
    },
];

const UpcomingMeals = () => {
    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-primary">
                    Upcoming Meals
                </h2>
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        document
                            .getElementById("add-upcoming-modal")
                            .showModal()
                    }>
                    Add Upcoming Meal
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingMeals
                            .sort((a, b) => b.likes - a.likes)
                            .map((meal, i) => (
                                <tr key={i}>
                                    <td>{meal.title}</td>
                                    <td>{meal.likes}</td>
                                    <td>{meal.reviews}</td>
                                    <td>
                                        <span className="badge badge-warning p-4 flex justify-center items-center">
                                            {meal.status}
                                        </span>
                                    </td>
                                    <td className="flex flex-wrap gap-2">
                                        <button className="btn btn-sm btn-primary">
                                            Publish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <dialog id="add-upcoming-modal" className="modal">
                <div className="modal-box w-full max-w-2xl">
                    <h3 className="font-bold text-lg text-primary mb-4">
                        Add Upcoming Meals
                    </h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="border p-2 rounded flex items-center gap-2 bg-base-100">
                            <FaUtensils />
                            <input
                                type="text"
                                placeholder="Meal Title"
                                className="grow outline-none bg-transparent"
                            />
                        </label>

                        <label className="border p-2 rounded flex items-center gap-2 bg-base-100">
                            <FaList />
                            <input
                                type="text"
                                placeholder="Category"
                                className="grow outline-none bg-transparent"
                            />
                        </label>

                        <label className="border rounded flex items-center gap-2 bg-base-100">
                            <input
                                type="file"
                                placeholder="Image URL"
                                className="file-input w-full file-input-bordered focus:outline-0 focus:border-0"
                            />
                        </label>

                        <label className="border p-2 rounded flex items-center gap-2 bg-base-100">
                            <FaLeaf />
                            <input
                                type="text"
                                placeholder="Ingredients"
                                className="grow outline-none bg-transparent"
                            />
                        </label>

                        <label className="border p-2 rounded flex items-center gap-2 bg-base-100 md:col-span-2">
                            <textarea
                                placeholder="Description"
                                className="grow outline-none bg-transparent resize-none"
                                rows={3}></textarea>
                        </label>

                        <label className="border p-2 rounded flex items-center gap-2 bg-base-100">
                            <FaDollarSign />
                            <input
                                type="number"
                                placeholder="Price"
                                className="grow outline-none bg-transparent"
                            />
                        </label>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-secondary mr-2">
                                Cancel
                            </button>
                            <button className="btn btn-primary">Add Meal</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UpcomingMeals;
