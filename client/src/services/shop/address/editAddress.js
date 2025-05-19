import axios from "axios";

export const editAddress = async ({ userId, addressId, formData }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing address:", error);
    throw error;
  }
};
