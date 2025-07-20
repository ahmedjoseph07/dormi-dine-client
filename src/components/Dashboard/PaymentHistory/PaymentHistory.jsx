import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Spinner/Spinner";

const PaymentHistory = () => {
    const { user } = useAuth();
    const { data: payments = [], isLoading: isPaymentLoading } = useQuery({
        queryKey: ["paymentHistory", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/api/payment-history?email=${user.email}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isPaymentLoading) return <Spinner />;

    return (
        <div className="w-full rounded-2xl shadow-lg bg-base-300 bg-opacity-30 backdrop-blur-md border border-base-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
                Payment History
            </h2>

            {payments.length === 0 ? (
                <div className="text-center text-accent py-6">
                    No payment history found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Transaction ID</th>
                                <th>Package Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.date}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.method}</td>
                                    <td>{p.transactionId}</td>
                                    <td>
                                        <span className={`badge ${p.package !== "free" ? "badge-success":"" }  p-4 font-medium`}>
                                            {p.package.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-success p-4 flex justify-center items-center">
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
