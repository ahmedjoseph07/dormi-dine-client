import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import registerAnim from "../assets/lottie/register.json";
import { Link } from "react-router";
import {
    FaEnvelope,
    FaLock,
    FaUser,
    FaEye,
    FaEyeSlash,
    FaImage,
    FaGoogle,
} from "react-icons/fa";
import { useState } from "react";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirm = () => setShowConfirm((prev) => !prev);

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8"
            initial={{ opacity: 0, y: -90 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.9 }}>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-base-100 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl">
                <Player
                    autoplay
                    loop
                    src={registerAnim}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4"
                />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary my-4 text-center">
                    Create an account
                </h2>

                <form className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    {/* Name */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaUser />
                        <input
                            type="text"
                            className="grow outline-none bg-transparent"
                            placeholder="Full Name"
                            required
                        />
                    </label>

                    {/* Email */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaEnvelope />
                        <input
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="grow outline-none bg-transparent"
                            placeholder="Email"
                            required
                        />
                    </label>

                    {/* Profile Picture */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full cursor-pointer">
                        <span className="flex-shrink-0">
                            <FaImage className="w-4 h-4" />
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            name="profile"
                            className="grow outline-none bg-transparent text-xs sm:text-sm file:mr-2 file:py-1 file:px-2 file:border-0 cursor-pointer"
                        />
                    </label>

                    {/* Password */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaLock />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="grow outline-none bg-transparent"
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="text-accent"
                            aria-label="Toggle Password">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </label>

                    {/* Confirm Password */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaLock />
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="grow outline-none bg-transparent"
                            placeholder="Confirm Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleConfirm}
                            className="text-accent"
                            aria-label="Toggle Confirm Password">
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </label>

                    <button className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2 text-sm sm:text-base">
                        Register
                    </button>
                </form>

                <div className="divider text-xs sm:text-sm">OR</div>

                <button
                    type="button"
                    className="btn btn-outline w-full flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <FaGoogle />
                    Sign up with Google
                </button>

                <p className="mt-4 text-center text-xs sm:text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-secondary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default RegisterPage;
