import axios from "axios";

const updateOrderDetails = async ({ id, orderStatus }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/order/update/${id}`,
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
