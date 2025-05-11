import Product from "../../models/Product.js";

export const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }
    const products = await Product.find(filters).sort(sort);
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
