import { searchProducts } from "../../controllers/shop/search-controller";

const express = require("express");

const searchRouter = express.Router();

searchRouter.get("/:keyword", searchProducts);

export default searchRouter;
