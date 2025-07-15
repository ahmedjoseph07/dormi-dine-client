import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import loginAnim from "../assets/lottie/login.json"; // ✅ Use a different lottie
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGoogle,
} from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setUser, loading, setLoading, login, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    const from = location?.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();

    if (loading) return <Spinner />;
    if (user) {
        return <Navigate to="/" />;
    }

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User logged in succesfully",
                showConfirmButton: false,
                timer: 1200,
            });

            navigate(from, { replace: true });
        } catch (err) {
            console.error("Google Login failed:", err);
        }
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            setLoading(true);
            const result = await login(email, password);
            setUser(result.user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User logged in succesfully",
                showConfirmButton: false,
                timer: 1200,
            });
            navigate(from, { replace: true });
        } catch (err) {
            if (err.message == "Firebase: Error (auth/invalid-credential).") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Invalid Credentials",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } finally {
            setLoading(false);
        }
    };

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
                    src={loginAnim}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4"
                />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary my-4 text-center">
                    Welcome Back
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    {/* Email */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaEnvelope />
                        <input
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="grow outline-none bg-transparent"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                    </label>
                    {errors.password && (
                        <p className="text-red-500 text-xs">
                            {errors.email.message}
                        </p>
                    )}

                    {/* Password */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaLock />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="grow outline-none bg-transparent"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="text-accent"
                            aria-label="Toggle Password">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </label>

                    {errors.password && (
                        <p className="text-red-500 text-xs">
                            {errors.password.message}
                        </p>
                    )}

                    <button className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2 text-sm sm:text-base">
                        Login
                    </button>
                </form>

                <div className="divider text-xs sm:text-sm">OR</div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="btn btn-outline w-full flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <FaGoogle />
                    Login with Google
                </button>

                <p className="mt-4 text-center text-xs sm:text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-secondary hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default LoginPage;
