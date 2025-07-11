import { motion } from "framer-motion";
import { FaChartPie, FaCalendarAlt, FaWallet } from "react-icons/fa";

const perks = [
    {
        icon: <FaChartPie className="text-3xl text-secondary" />,
        title: "Meal Analytics",
        desc: "Track your eating patterns, calories, and meal expenses in real time.",
    },
    {
        icon: <FaCalendarAlt className="text-3xl text-secondary" />,
        title: "Smart Meal Planner",
        desc: "Plan meals ahead with dorm-wide sync & get reminders.",
    },
    {
        icon: <FaWallet className="text-3xl text-secondary" />,
        title: "Expense Dashboard",
        desc: "Manage your balance, dues & deposits transparently.",
    },
];

const MemberPerks = () => {
    return (
        <div className="bg-base-200 ">
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-primary mb-10">
                    Why Join Dormi<span className="text-neutral">Dine</span> ?
                </h2>
                <p className="text-center text-accent max-w-xl mx-auto mb-12">
                    Unlock powerful features built just for boarders. Sign in to
                    experience the dashboard that works *for* you.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {perks.map((perk, i) => (
                        <motion.div
                            key={perk.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="card cursor-pointer bg-base-200 p-6 rounded-xl shadow-xl hover:shadow-secondary/30 hover:scale-[1.02] transition-all duration-300">
                            <div className="mb-4">{perk.icon}</div>
                            <h3 className="text-xl font-semibold text-neutral mb-2">
                                {perk.title}
                            </h3>
                            <p className="text-sm text-accent">{perk.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemberPerks;
