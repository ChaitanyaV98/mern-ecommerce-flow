import express from "express";
import {
  addToCart,
  fetchCartItems,
  updateCartItemsQty,
  deleteCartItem,
} from "../../controllers/shop/cart-controller";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", fetchCartItems);
cartRouter.put("/update-cart", updateCartItemsQty);
cartRouter.delete("/:userId/:productId", deleteCartItem);

export default cartRouter;
