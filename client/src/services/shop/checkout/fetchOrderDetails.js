import axios from "axios";

const fetchOrderDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/details/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching cart items", error);
    throw error;
  }
};

export default fetchOrderDetails;
