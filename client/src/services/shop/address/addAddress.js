import axios from "axios";

export const addAddress = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/shop/address/add",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
