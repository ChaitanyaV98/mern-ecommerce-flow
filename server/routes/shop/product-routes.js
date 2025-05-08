import express from "express";

import { getFilteredProducts } from "../../controllers/shop/products-controller.js";

const shopProductRouter = express.Router();

adminProductRouter.get("/get", getFilteredProducts);

export default shopProductRouter;
