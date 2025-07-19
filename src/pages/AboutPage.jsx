import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <section className="py-16 px-4 bg-base-200 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="cursor-pointer max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/30">
                <h2 className="text-3xl font-bold text-primary mb-6">
                    About DormiDine
                </h2>
                <p className="text-accent text-base leading-relaxed">
                    DormiDine is your digital dining companion for hostel life.
                    Whether you're checking upcoming meals, rating food quality,
                    or managing subscriptions, we've got you covered. Our
                    mission is to bring transparency, satisfaction, and ease to
                    the daily dining experience for students across CUET and
                    beyond.
                </p>
                <p className="text-neutral mt-4">
                    Built for students, by students — clean, simple, and smart.
                </p>
            </motion.div>
        </section>
    );
};

export default AboutPage;
