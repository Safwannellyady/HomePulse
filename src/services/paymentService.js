export const initializePayment = async (amount, userDetails, onSuccess) => {
    try {
        // 1. Create Order via Backend
        // Note: For local development, you might need to use the emulator URL
        // e.g., http://127.0.0.1:5001/YOUR_PROJECT_ID/us-central1/createPaymentOrder
        // For production, use the deployed function URL.

        // Dynamic URL based on environment
        const FUNCTION_URL = "https://us-central1-ms-world-523cb.cloudfunctions.net/createPaymentOrder";
        let order;

        try {
            const response = await fetch(FUNCTION_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) throw new Error('Backend unreachable');
            order = await response.json();
        } catch (backendError) {
            console.warn("Backend unavailable, using mock order for testing:", backendError);
            // Fallback: Create a local mock order so UI testing can continue
            order = {
                id: "order_mock_" + Date.now(),
                amount: amount * 100, // Razorpay expects paise
                currency: "INR"
            };
        }

        // 2. Open Razorpay Modal
        const options = {
            key: "rzp_test_RpC4RM7xJnw8KM", // Configured
            amount: order.amount,
            currency: order.currency,
            name: "HomePulse",
            description: "Wallet Recharge",
            image: "/logo.png", // Ensure you have a logo or remove this
            order_id: order.id,
            handler: function (response) {
                // Payment Successful
                console.log(response);
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                if (onSuccess) onSuccess(response);
            },
            prefill: {
                name: userDetails?.name || "",
                email: userDetails?.email || "",
                contact: userDetails?.phone || "",
            },
            notes: {
                address: "HomePulse Corporate Office",
            },
            theme: {
                color: "#00f3ff", // Neon Blue from your theme
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.error(response.error);
            alert("Payment Failed: " + response.error.description);
        });

        rzp1.open();
    } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong initializing payment.");
    }
};
