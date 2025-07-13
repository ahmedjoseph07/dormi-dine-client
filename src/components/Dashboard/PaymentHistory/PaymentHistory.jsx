import React from "react";

const payments = [
    {
        date: "2025-07-01",
        amount: "$30",
        method: "Credit Card",
        status: "Success",
    },
    {
        date: "2025-06-15",
        amount: "$25",
        method: "Bkash",
        status: "Success",
    },
];

const PaymentHistory = () => {
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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.date}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.method}</td>
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
