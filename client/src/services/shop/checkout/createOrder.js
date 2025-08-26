import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create-order`,
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating  order", error);
    throw error;
  }
};
