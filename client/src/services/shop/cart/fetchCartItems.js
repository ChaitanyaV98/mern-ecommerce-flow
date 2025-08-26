import axios from "axios";

const fetchCartItems = async (userId) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API}/api/shop/cart/get/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching cart items", error);
    throw error;
  }
};

export default fetchCartItems;
