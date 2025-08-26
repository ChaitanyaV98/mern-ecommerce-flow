import axios from "axios";

const fetchAllOrders = async () => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API}/api/admin/order/orders`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching items", error);
    throw error;
  }
};

export default fetchAllOrders;
