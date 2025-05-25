import express from "express";
import {
  createOrder,
  capturePayment,
} from "../../controllers/shop/order-controller.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.post("/capture-payment", capturePayment);

export default orderRouter;
