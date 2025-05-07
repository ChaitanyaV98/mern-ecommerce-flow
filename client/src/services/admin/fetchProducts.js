import axios from "axios";

const getAllProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/products/get"
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching products", error);
    throw error;
  }
};

export default getAllProducts;
