import axios from "axios";

export const updateCartQty = async ({ userId, productId, quantity }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// export default addToCart;
