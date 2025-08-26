import axios from "axios";

const getAllFilteredProducts = async ({ filterParams, sortParams }) => {
  try {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API}/api/shop/products/get?${query}`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching products", error);
    throw error;
  }
};

export default getAllFilteredProducts;
