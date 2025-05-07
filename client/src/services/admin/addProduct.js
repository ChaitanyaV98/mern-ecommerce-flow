import axios from "axios";

const addProduct = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export default addProduct;
