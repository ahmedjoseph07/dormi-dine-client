import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            setLoading(true);
            setError("");

            const res = await axiosInstance.post("api/subscribe", { email });

            if (res.status === 200) {
                setSubscribed(true);
                setEmail("");
            }
        } catch (err) {
            setError("Subscription failed. Try again later.", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16 px-4 bg-base-200 text-center md:mt-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="cursor-pointer max-w-xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/30">
                <h2 className="text-3xl font-bold text-primary mb-6">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-accent mb-6">
                    Get the latest updates on new meals, events, and campus news
                    delivered straight to your inbox.
                </p>

                {!subscribed ? (
                    <form
                        onSubmit={handleSubscribe}
                        className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border focus:outline-0 px-3 rounded-lg w-full sm:flex-1"
                            required
                        />
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-secondary w-full sm:w-auto px-6 py-3 rounded-lg">
                            {loading ? "Subscribing..." : "Subscribe"}
                        </button>
                    </form>
                ) : (
                    <p className="text-accent text-lg font-semibold mt-4">
                        Thank you for subscribing!
                    </p>
                )}
                {error && <p className="text-red-500 mt-3">{error}</p>}
            </motion.div>
        </div>
    );
};

export default Newsletter;
