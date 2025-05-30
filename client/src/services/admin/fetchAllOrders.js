import axios from "axios";

const fetchAllOrders = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/order/orders`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching items", error);
    throw error;
  }
};

export default fetchAllOrders;
