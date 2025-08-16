import { motion } from "framer-motion";
import {
    FaSearch,
    FaUtensils,
    FaStar,
    FaClock,
    FaRegSmile,
} from "react-icons/fa";

const steps = [
    {
        icon: <FaSearch className="text-primary text-3xl" />,
        title: "Browse Meals",
        desc: "Explore a wide variety of meals by category, price, or search keywords to find exactly what you’re craving.",
    },
    {
        icon: <FaUtensils className="text-secondary text-3xl" />,
        title: "Request / Order",
        desc: "Choose your favorite meal and request or order it instantly with a single click.",
    },
    {
        icon: <FaStar className="text-warning text-3xl" />,
        title: "Leave Reviews",
        desc: "Share your experience by rating meals and writing reviews to help others choose better.",
    },
    {
        icon: <FaClock className="text-accent text-3xl" />,
        title: "Track Meals",
        desc: "Check your dashboard to see requested, upcoming, or delivered meals in real-time.",
    },
    {
        icon: <FaRegSmile className="text-success text-3xl" />,
        title: "Enjoy & Share",
        desc: "Enjoy your meal and share your feedback with the community to make DormiDine better.",
    },
];

const UserGuidePage = () => {
    return (
        <div className="min-h-screen bg-base-200 px-4 py-10 md:mt-24">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
                    User Guide
                </h2>
                <p className="text-center text-neutral max-w-2xl mx-auto">
                    DormiDine is built to make your campus dining experience
                    easier and more fun. Follow these simple steps to get
                    started and make the most out of the platform.
                </p>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-base-100 cursor-pointer rounded-xl shadow-xl hover:shadow-primary/20 p-6 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">
                            <div className="mb-4">{step.icon}</div>
                            <h3 className="text-xl font-bold text-primary">
                                {step.title}
                            </h3>
                            <p className="text-sm text-neutral mt-2">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserGuidePage;
