import axios from "axios";

const getAllFilteredProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/shop/products/get"
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching products", error);
    throw error;
  }
};

export default getAllFilteredProducts;
