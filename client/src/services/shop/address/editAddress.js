import axios from "axios";

export const editAddress = async ({ userId, addressId, formData }) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.put(
      `${API}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    console.log("Update responseeee---", response);
    return response.data;
  } catch (error) {
    console.error("Error editing address:", error);
    throw error;
  }
};
