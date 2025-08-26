import axios from "axios";

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};

export default deleteProduct;
