import axios from "axios";

export const fetchAddressList = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching addressList", error);
    throw error;
  }
};
