import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import registerAnim from "../assets/lottie/register.json";
import { Link, useNavigate } from "react-router";
import axios from "axios";
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
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner/Spinner";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const RegisterPage = () => {
    const {
        createUser,
        updateUser,
        setUser,
        user,
        loading,
        setLoading,
        googleLogin,
    } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirm = () => setShowConfirm((prev) => !prev);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

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

            navigate("/");
        } catch (err) {
            console.error("Google Login failed:", err);
        }
    };

    const onSubmit = async (data) => {
        setFormLoading(true);
        const { name, email, password, image } = data;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", image[0]);
            formData.append("upload_preset", uploadPreset);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const imageURL = response.data.secure_url;

            const result = await createUser(email, password);
            await updateUser({
                displayName: name,
                photoURL: imageURL,
            });
            setUser(result.user);
            setLoading(false);
            await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User registered successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch (err) {
            if (err.message == "Firebase: Error (auth/invalid-email).") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Must enter a valid email",
                });
            } else if (
                err.message == "Firebase: Error (auth/email-already-in-use)."
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email already in use",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong",
                });
            }
            console.error(err);
        } finally {
            setFormLoading(false);
        }
    };
    if (formLoading) return <Spinner />;

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

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    {/* Name */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaUser />
                        <input
                            type="text"
                            className="grow outline-none bg-transparent"
                            placeholder="Full Name"
                            {...register("name", { required: true })}
                        />
                    </label>
                    {errors.name && (
                        <p className="text-red-500 text-xs">Name is required</p>
                    )}

                    {/* Email */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaEnvelope />
                        <input
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            className="grow outline-none bg-transparent"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                    </label>
                    {errors.email && (
                        <p className="text-red-500 text-xs">Email is required</p>
                    )}

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
                            {...register("image", { required: true })}
                        />
                    </label>
                    {errors.image && (
                        <p className="text-red-500 text-xs">Profile image required</p>
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
                                minLength: 6,
                                validate: {
                                    hasUpperCase: (value) =>
                                        /[A-Z]/.test(value) ||
                                        "Password must contain  at least one uppercase",
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

                    {/* Confirm Password */}
                    <label className="border p-2 rounded flex items-center gap-2 w-full">
                        <FaLock />
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="grow outline-none bg-transparent"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) => {
                                    return (
                                        value === watch("password") ||
                                        "Passwords do not match"
                                    );
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirm}
                            className="text-accent"
                            aria-label="Toggle Confirm Password">
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </label>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs">
                            {errors.confirmPassword.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full flex items-center justify-center mt-2 text-sm sm:text-base">
                        {loading ? (
                            <>
                                <Spinner />
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                <div className="divider text-xs sm:text-sm">OR</div>

                <button onClick={handleGoogleLogin}
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
