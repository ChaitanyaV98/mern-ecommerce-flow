import axios from "axios";

export const deleteCartItem = async ({ userId, productId }) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/cart/delete/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while deleteting", error);
    throw error;
  }
};
