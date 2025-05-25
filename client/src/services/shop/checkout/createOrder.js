import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/create-order ",
      orderData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating  order", error);
    throw error;
  }
};
