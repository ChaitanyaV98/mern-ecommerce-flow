import axios from "axios";

export const addAddress = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
