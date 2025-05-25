import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const paypal = {
  OrdersCreateRequest: checkoutNodeJssdk.orders.OrdersCreateRequest,
  OrdersCaptureRequest: checkoutNodeJssdk.orders.OrdersCaptureRequest,
};

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NODE_ENV === "production"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function paypalClient() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export { paypal, paypalClient };
