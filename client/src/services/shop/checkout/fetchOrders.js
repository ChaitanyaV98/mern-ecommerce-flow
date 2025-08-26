import axios from "axios";

const fetchAllOrders = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching cart items", error);
    throw error;
  }
};

export default fetchAllOrders;
