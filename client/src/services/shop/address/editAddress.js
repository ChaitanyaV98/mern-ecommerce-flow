import axios from "axios";

export const editAddress = async ({ userId, addressId, formData }) => {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    console.log("Update responseeee---", response);
    return response.data;
  } catch (error) {
    console.error("Error editing address:", error);
    throw error;
  }
};
