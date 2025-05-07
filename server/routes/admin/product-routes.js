import express from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const adminProductRouter = express.Router();

adminProductRouter.post(
  "/upload-image",
  upload.single("my-file"),
  handleImageUpload
);

export default adminProductRouter;
