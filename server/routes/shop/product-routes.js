import express from "express";

import { getFilteredProducts } from "../../controllers/shop/products-controller.js";

const shopProductRouter = express.Router();

shopProductRouter.get("/get", getFilteredProducts);

export default shopProductRouter;
