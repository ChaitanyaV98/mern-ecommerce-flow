import axios from "axios";

const addProduct = async (formData) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.post(
      `${API}/api/admin/products/add`,
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
