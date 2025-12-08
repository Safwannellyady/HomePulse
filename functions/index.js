const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors")({ origin: true });

// Initialize Razorpay with credentials from Firebase Config
// Run: firebase functions:config:set razorpay.key_id="YOUR_KEY" razorpay.key_secret="YOUR_SECRET"
// to set these values.
const razorpay = new Razorpay({
    key_id: functions.config().razorpay?.key_id || "TEST_KEY_ID", // Fallback for dev/emulator if config is missing
    key_secret: functions.config().razorpay?.key_secret || "TEST_KEY_SECRET",
});

exports.createPaymentOrder = functions.https.onRequest((req, res) => {
    // Enable CORS
    cors(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                return res.status(405).send({ error: 'Method Not Allowed' });
            }

            const { amount, currency = "INR" } = req.body;

            if (!amount) {
                return res.status(400).send({ error: "Amount is required" });
            }

            // Create an order in Razorpay
            const options = {
                amount: amount * 100, // Amount in paise
                currency,
                receipt: `receipt_${Date.now()}`,
            };

            const order = await razorpay.orders.create(options);

            // Send the order details back to the client
            res.status(200).json(order);
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            res.status(500).send({ error: error.message });
        }
    });
});
