import axios from "axios";

export const deleteCartItem = async ({ userId, productId }) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.delete(
      `${API}/api/shop/cart/${userId}/${productId}`
    );
    console.log("response data after delete", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while deleteting", error);
    throw error;
  }
};
