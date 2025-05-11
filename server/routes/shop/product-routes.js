import express from "express";

import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js";

const shopProductRouter = express.Router();

shopProductRouter.get("/get", getFilteredProducts);
shopProductRouter.get("/get/:id", getProductDetails);

export default shopProductRouter;
