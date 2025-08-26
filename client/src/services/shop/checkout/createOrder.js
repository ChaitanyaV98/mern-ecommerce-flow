import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.post(
      `${API}/api/shop/order/create-order`,
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating  order", error);
    throw error;
  }
};
