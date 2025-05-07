import express from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller";
import { upload } from "../../helpers/cloudinary";

const adminProductRouter = express.Router();

adminProductRouter.post(
  "/upload-image",
  upload.single("my-file"),
  handleImageUpload
);

export default adminProductRouter;
