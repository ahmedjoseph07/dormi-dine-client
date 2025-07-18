import { Link } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import errorAnim from "../assets/lottie/error.json";

const ErrorPage = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Player
                autoplay
                loop
                src={errorAnim}
                className="w-60 h-60 md:w-80 md:h-80"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-error mb-4">
                Oops! Something went wrong.
            </h2>
            <p className="text-base md:text-lg text-neutral mb-6">
                We couldn’t load the page. Please try again or go back home.
            </p>
            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
        </motion.div>
    );
};

export default ErrorPage;
