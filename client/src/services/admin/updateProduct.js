import axios from "axios";

const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error while updating the product", error);
    throw error;
  }
};

export default updateProduct;
