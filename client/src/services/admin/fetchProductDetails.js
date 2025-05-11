import axios from "axios";

const getProductDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching product details", error);
    throw error;
  }
};

export default getProductDetails;
