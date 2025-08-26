import axios from "axios";

const deleteProduct = async (id) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.delete(
      `${API}/api/admin/products/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting products:", error);
    throw error;
  }
};

export default deleteProduct;
