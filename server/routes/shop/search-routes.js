import { searchProducts } from "../../controllers/shop/search-controller.js";

import express from "express";

const searchRouter = express.Router();

searchRouter.get("/:keyword", searchProducts);

export default searchRouter;
