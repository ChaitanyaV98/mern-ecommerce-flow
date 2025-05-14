import axios from "axios";

const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/shop/cart/get/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching cart items", error);
    throw error;
  }
};

export default fetchCartItems;
