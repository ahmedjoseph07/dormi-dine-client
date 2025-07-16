import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const packages = {
    silver: 999,
    gold: 1999,
    platinum: 2999,
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { packageName } = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    const price = packages[packageName.toLocaleLowerCase()] || 999;

    const { data: alreadyPaid = false, isLoading: checkingPayment } = useQuery({
        queryKey: ["alreadyPaid", user?.email, packageName],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/already-paid`, {
                params: { email: user?.email, packageName },
            });
            return res.data.alreadyPaid;
        },
        enabled: !!user?.email && !!packageName,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        
        if (alreadyPaid) {
            Swal.fire({
                icon: "info",
                title: "Already Purchased",
                text: `You have already purchased the ${packageName.toUpperCase()} package.`,
            });
            return;
        }

        setLoading(true);
        try {
            // Create Payment Intent
            const res = await axiosInstance.post("/api/create-payment-intent", {
                packageName,
            });

            const clientSecret = res.data.clientSecret;

            // Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                setMessage("Payment successful");
                // Save Payment to DB
                await axiosInstance.post("/api/save-payment", {
                    email: user?.email,
                    amount: result.paymentIntent.amount / 100,
                    method: result.paymentIntent.payment_method_types[0],
                    transactionId: result.paymentIntent.id,
                    packageName,
                    status: "Success",
                });
                Swal.fire({
                    icon: "success",
                    title: "Payment successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                await axiosInstance.patch("/api/update-user-package", {
                    email: user?.email,
                    packageName,
                });
                //TODO send payment info to DB here;
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1600);
            }
        } catch (err) {
            setMessage("Something went wrong ", err.message);
        }
        setLoading(false);
    };

    if (checkingPayment) return <p>Checking payment status...</p>;
    if (alreadyPaid) {
        return (
            <div className="text-center text-warning mt-10">
                You have already purchased the{" "}
                <b>{packageName.toUpperCase()}</b> package.
            </div>
        );
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md w-full bg-base-100 p-6 rounded-lg shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-primary">
                Checkout -{" "}
                <span className="text-secondary">
                    {packageName.toUpperCase()}
                </span>
            </h2>
            <p className="text-neutral font-semibold">
                Price: ${(price / 100).toFixed(2)}
            </p>

            <CardElement
                className="border p-3 rounded-md"
                options={{ style: { base: { fontSize: "16px" } } }}
            />

            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay Now"}
            </button>

            {message && (
                <div className="mt-4 text-sm text-center text-warning">
                    {message}
                </div>
            )}
        </form>
    );
};

export default PaymentForm;
