const paypal = require("@paypal/checkout-server-sdk");

// Creating PayPal Environment............
function environment() {
    return new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,//client id........
        process.env.PAYPAL_SECRET//client secret............
    );
}

// Create PayPal Client to handle requests..........
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}
//exporting it so we can use it in other modules..........
module.exports = { client, paypal };
