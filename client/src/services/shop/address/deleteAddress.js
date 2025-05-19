import axios from "axios";

export const deleteAddress = async ({ userId, addressId }) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
    );
    console.log("response data after delete", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while deleteting", error);
    throw error;
  }
};
