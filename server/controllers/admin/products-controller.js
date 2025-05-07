import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

export const handleImageUpload = async (req, res) => {
  try {
    //convert the file to base 64 format
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    // const url = "data:" + req.file.mimetype + ";base64" + b64;
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    return res.json({
      success: true,
      result,
    });
  } catch (e) {
    console.log("Error in handle image upload", e);
    return res.status(500).json({
      success: false,
      message: "Error occured! Please try again ",
    });
  }
};

//add product

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();

    return res.status(201).json({
      success: true,
      message: "New product is added successfully",
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log("Error while adding a product", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

//fetch all products

export const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    if (listOfProducts) {
      return res.status(200).json({
        success: true,
        data: listOfProducts,
      });
    }
  } catch (error) {
    console.log("Error while fetching products", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

//edit a product

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const findProduct = await Product.find(id);
    if (!findProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found ",
      });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    return res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log("Error while updating product", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

//delete a product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    return res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    console.log("Error while deleting  product", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
