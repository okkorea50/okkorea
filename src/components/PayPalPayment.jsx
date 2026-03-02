import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalPayment = ({ amount = "100.00", onSuccess, onError }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <div className="w-full max-w-md mx-auto">
            {isPending && <div className="flex justify-center p-4"><div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div></div>}
            <PayPalButtons
                style={{ layout: "vertical", shape: "pill", label: "pay" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: amount,
                                },
                                description: "OKKorea Premium Course Access",
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    if (onSuccess) {
                        onSuccess(details);
                    }
                }}
                onError={(err) => {
                    console.error("PayPal Error:", err);
                    if (onError) onError(err);
                }}
            />
        </div>
    );
};

export default PayPalPayment;
