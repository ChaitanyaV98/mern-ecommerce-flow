import axios from "axios";

export const addToCart = async ({ userId, productId, quantity }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/shop/cart/add",
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
