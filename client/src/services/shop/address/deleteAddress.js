import axios from "axios";

export const deleteAddress = async ({ userId, addressId }) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.delete(
      `${API}/api/shop/address/delete/${userId}/${addressId}`
    );
    console.log("response data after delete", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while deleteting", error);
    throw error;
  }
};
