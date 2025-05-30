import express from "express";
import {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controllers/shop/order-controller.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.post("/capture-payment", capturePayment);
orderRouter.get("/list/:userId", getAllOrdersByUser);
orderRouter.get("/details/:id", getOrderDetails);

export default orderRouter;
