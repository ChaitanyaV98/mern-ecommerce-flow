import axios from "axios";

const getAllProducts = async () => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API}/api/admin/products/get`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching products", error);
    throw error;
  }
};

export default getAllProducts;
