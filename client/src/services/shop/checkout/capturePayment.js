import axios from "axios";

export const capturePayment = async ({ token, payerID, orderId }) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.post(`${API}/api/shop/order/capture-payment`, {
      token,
      payerID,
      orderId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating  order", error);
    throw error;
  }
};
