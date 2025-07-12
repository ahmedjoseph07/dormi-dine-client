import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
    {
        name: "Aisha Rahman",
        position: "Boarder, CUET Hall-4",
        feedback:
            "DormiDine made my hostel life 10x better! Meals are organized, and I never miss my favorites.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        name: "Tanvir Hasan",
        position: "Student, Mechanical Dept.",
        feedback:
            "The user experience is smooth, and I love how I can see upcoming meals with just one click.",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
        name: "Sadia Ahmed",
        position: "Verified Member",
        feedback:
            "Upgrading to Platinum was totally worth it. Support and personalization are top-notch.",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
];

const TestimonialSlider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () =>
        setIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );

    return (
        <section className="py-16 px-4 bg-base-200 text-center">
            <h2 className="text-3xl font-bold mb-10 text-primary">
                What Our Users Say
            </h2>
            <div className="relative max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer hover:shadow-primary/30">
                        <div className="flex justify-center mb-4">
                            <img
                                src={testimonials[index].image}
                                alt={testimonials[index].name}
                                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                            />
                        </div>
                        <FaQuoteLeft className="text-2xl text-primary mb-2" />
                        <p className="text-neutral mb-4">
                            {testimonials[index].feedback}
                        </p>
                        <FaQuoteRight className="text-2xl text-primary mb-2" />
                        <h4 className="font-bold text-lg">
                            {testimonials[index].name}
                        </h4>
                        <p className="text-sm text-accent">
                            {testimonials[index].position}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={prev}
                        className="btn btn-sm btn-outline"
                        aria-label="Previous Testimonial">
                        ‹
                    </button>
                    <button
                        onClick={next}
                        className="btn btn-sm btn-outline"
                        aria-label="Next Testimonial">
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSlider;
