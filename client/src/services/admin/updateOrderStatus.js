import axios from "axios";

const updateOrderDetails = async ({ id, orderStatus }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/order/update/${id}`,
      {
        orderStatus,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error while updating order ", error);
    throw error;
  }
};

export default updateOrderDetails;
