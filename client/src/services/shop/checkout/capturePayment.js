import axios from "axios";

export const capturePayment = async ({ token, payerID }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/capture-payment",
      {
        token,
        payerID,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating  order", error);
    throw error;
  }
};
