import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaPhone,
    FaComments,
    FaQuestionCircle,
} from "react-icons/fa";

const supportOptions = [
    {
        icon: <FaEnvelope className="text-primary text-3xl" />,
        title: "Email Support",
        desc: "Reach out to us anytime via email for account or meal-related queries.",
        contact: "support@dormidine.com",
    },
    {
        icon: <FaPhone className="text-secondary text-3xl" />,
        title: "Phone Support",
        desc: "Call us during working hours (Mon–Fri, 9am–6pm) for quick assistance.",
        contact: "+88 (017) 123-45678",
    },
    {
        icon: <FaComments className="text-success text-3xl" />,
        title: "Live Chat",
        desc: "Connect with our support team instantly through live chat inside the app.",
        contact: "Coming Soon",
    },
    {
        icon: <FaQuestionCircle className="text-warning text-3xl" />,
        title: "FAQs",
        desc: "Check out the most frequently asked questions and solutions to common issues.",
        contact: "Coming Soon",
    },
];

const SupportPage = () => {
    return (
        <div className="min-h-screen bg-base-200 px-4 py-10 md:mt-24">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
                    Support
                </h2>
                <p className="text-center text-neutral max-w-2xl mx-auto">
                    Need help with DormiDine? We’re here for you. Choose any of
                    the support options below or check out our FAQs for quick
                    answers.
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
                    {supportOptions.map((option, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-base-100 cursor-pointer rounded-xl shadow-xl hover:shadow-primary/20 p-6 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">
                            <div className="mb-4">{option.icon}</div>
                            <h3 className="text-xl font-bold text-primary">
                                {option.title}
                            </h3>
                            <p className="text-sm text-neutral mt-2">
                                {option.desc}
                            </p>
                            <p className="text-sm font-semibold text-accent mt-2">
                                {option.contact}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
