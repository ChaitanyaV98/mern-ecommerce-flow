import axios from "axios";

export const fetchAddressList = async (userId) => {
  try {
    const API = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API}/api/shop/address/get/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching addressList", error);
    throw error;
  }
};
