import axios from "axios";

const getProductDetails = async (id) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API}/api/shop/products/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching product details", error);
    throw error;
  }
};

export default getProductDetails;
