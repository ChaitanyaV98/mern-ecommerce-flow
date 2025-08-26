import axios from "axios";

const fetchOrderDetails = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/order/details/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching cart items", error);
    throw error;
  }
};

export default fetchOrderDetails;
