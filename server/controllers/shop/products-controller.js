import Product from "../../models/Product.js";

export const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products) {
      return res.status(200).json({
        success: true,
        data: products,
      });
    }
    res.status(404).json({
      success: false,
      message: "No products found!",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
