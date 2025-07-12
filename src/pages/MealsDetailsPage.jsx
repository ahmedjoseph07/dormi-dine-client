import { motion } from "framer-motion";
import {
    FaClock,
    FaHeart,
    FaStar,
    FaUtensils,
    FaUserAlt,
} from "react-icons/fa";
import mealImg from "../assets/meal.webp";
import ReviewForm from "../components/ReviewForm/ReviewForm";

const dummyMeal = {
    title: "Chicken Biryani",
    // image: "https://source.unsplash.com/featured/?biryani",
    distributor: "Hall 4 Kitchen Staff",
    description:
        "Aromatic basmati rice layered with marinated chicken, saffron, and spices. Served with raita and salad.",
    ingredients: ["Chicken", "Basmati Rice", "Spices", "Yogurt", "Saffron"],
    rating: 4.5,
    postTime: "2 hours ago",
    likes: 123,
    reviews: 14,
};

const MealDetails = () => {
    const {
        title,
        // image,
        distributor,
        description,
        ingredients,
        rating,
        postTime,
        likes,
        reviews,
    } = dummyMeal;

    return (
        <div className="min-h-screen py-12 px-4 bg-base-200">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl hover:shadow-primary/30 mx-auto bg-base-100 rounded-2xl shadow-xl p-6 md:p-10 space-y-6 ">
                    
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={mealImg}
                        alt={title}
                        className="w-full md:w-1/2 rounded-2xl object-cover max-h-96 shadow-lg"
                    />
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl font-bold text-primary">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-accent">
                            <FaUserAlt /> <span>{distributor}</span>
                        </div>
                        <p className="text-neutral">{description}</p>
                        <div className="flex items-center gap-3 text-sm mt-2 text-neutral">
                            <FaClock />
                            <span>Posted {postTime}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1 text-warning">
                                <FaStar /> <span>{rating}/5</span>
                            </div>
                            <div className="flex items-center gap-1 text-error">
                                <FaHeart /> <span>{likes} Likes</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {ingredients.map((item, i) => (
                                <span
                                    key={i}
                                    className="badge cursor-pointer badge-outline badge-accent text-xs">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn btn-primary">
                        <FaHeart /> Like
                    </button>
                    <button className="btn btn-secondary">
                        <FaUtensils /> Request Meal
                    </button>
                </div>

                <div className="pt-6 border-t mt-6">
                    <h3 className="text-xl font-bold text-primary mb-4">
                        Reviews ({reviews})
                    </h3>

                    <div className="mt-6 space-y-4 mb-10">
                        <div className="bg-base-300 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-neutral">
                                “Tasted amazing, reminds me of home. Great work
                                by the kitchen team!”
                            </p>
                            <p className="text-xs text-accent mt-2">
                                — Salman, CSE Dept.
                            </p>
                        </div>
                        <div className="bg-base-300 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-neutral">
                                “Needs a bit more spice but overall very
                                satisfying meal.”
                            </p>
                            <p className="text-xs text-accent mt-2">
                                — Nabila, EEE Dept.
                            </p>
                        </div>
                    </div>

                    <ReviewForm />
                </div>
            </motion.div>
        </div>
    );
};

export default MealDetails;
