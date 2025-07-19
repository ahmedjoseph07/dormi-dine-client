import { motion } from "framer-motion";

const ContactPage = () => {
    return (
        <section className="py-16 px-4 bg-base-200 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className=" cursor-pointer max-w-xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/30">
                <h2 className="text-3xl font-bold text-primary mb-6">
                    Contact Us
                </h2>
                <p className="text-accent mb-4">
                    Have questions, feedback, or want to get involved? We’d love
                    to hear from you!
                </p>

                <form className="space-y-4 text-left">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="border focus:outline-0 p-2 rounded-lg w-full"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="border focus:outline-0 p-2 rounded-lg w-full"
                    />
                    <textarea
                        className="border focus:outline-0 p-2 rounded-lg w-full"
                        rows="4"
                        placeholder="Your Message"></textarea>
                    <button type="submit" className="btn btn-primary w-full">
                        Send Message
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default ContactPage;
