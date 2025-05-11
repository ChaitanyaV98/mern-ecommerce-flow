import axios from "axios";

const getAllFilteredProducts = async ({ filterParams, sortParams }) => {
  try {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get?${query}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching products", error);
    throw error;
  }
};

export default getAllFilteredProducts;
