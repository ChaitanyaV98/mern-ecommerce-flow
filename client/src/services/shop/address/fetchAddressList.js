import axios from "axios";

export const fetchAddressList = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching addressList", error);
    throw error;
  }
};
