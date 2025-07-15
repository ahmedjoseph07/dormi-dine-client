import { Link } from "react-router";
import { motion } from "framer-motion";



const packages = [
    {
        name: "Silver",
        price: "$9.99/month",
        perks: ["Basic Meal Access", "No Ads"],
        bg: "bg-[#C0C0C0]/20 border-[#C0C0C0]",
    },
    {
        name: "Gold",
        price: "$19.99/month",
        perks: ["Priority Meals", "No Ads", "Invite Friends"],
        bg: "bg-[#FFD700]/20 border-[#FFD700]",
    },
    {
        name: "Platinum",
        price: "$29.99/month",
        perks: ["All Access", "Meal Suggestions", "Community Chat"],
        bg: "bg-[#E5E4E2]/20 border-[#E5E4E2]",
    },
];

const Membership = () => {
    return (
        <section className="py-10 px-4 bg-base-200 text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
                Upgrade Your Experience
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {packages.map(({ name, price, perks, bg,},i) => (
                    <motion.div
                        key={name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * .3 }}
                        className={`border rounded-xl p-6 transition-transform hover:scale-105 shadow-xl hover:shadow-secondary/30 cursor-pointer ${bg}`}>
                        <h3 className="text-xl font-bold mb-2">
                            {name} Package
                        </h3>
                        <p className="text-lg font-semibold text-primary mb-4">
                            {price}
                        </p>
                        <ul className="text-sm text-neutral mb-4 space-y-1">
                            {perks.map((perk, i) => (
                                <li key={i}>✔ {perk}</li>
                            ))}
                        </ul>
                        <Link
                            to={`/checkout/${name.toLowerCase()}`}
                            className="btn">
                            Choose {name}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Membership;
