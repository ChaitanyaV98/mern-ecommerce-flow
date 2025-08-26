import axios from "axios";

export const addToCart = async ({ userId, productId, quantity }) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.post(`${API}/api/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// export default addToCart;
