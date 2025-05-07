import express from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";
import {
  addProduct,
  updateProduct,
  fetchAllProducts,
  deleteProduct,
} from "../../controllers/admin/products-controller.js";

const adminProductRouter = express.Router();

adminProductRouter.post(
  "/upload-image",
  upload.single("my-file"),
  handleImageUpload
);

adminProductRouter.post("/add", addProduct);
adminProductRouter.put("/edit/:id", updateProduct);
adminProductRouter.delete("/delete/:id", deleteProduct);
adminProductRouter.get("/get", fetchAllProducts);

export default adminProductRouter;
