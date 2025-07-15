import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../api/axiosInstance";

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

    const price = packages[packageName.toLocaleLowerCase()] || 999;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        try {
            // Create Payment Intent
            const res = await axiosInstance.post("/api/create-payment-intent",{
                packageName,
            })

            const clientSecret = res.data.clientSecret;

            // Confirm Payment 
            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card: elements.getElement(CardElement),
                },
            })

            if(result.error){
                setMessage(result.error.message);
            }else if(result.paymentIntent.status === "succeeded"){
                setMessage("Payment successful");
                //TODO send payment info to DB here;
            }
        } catch (err) {
            setMessage("Something went wrong ",err.message);
        }
        setLoading(false);
    };
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
