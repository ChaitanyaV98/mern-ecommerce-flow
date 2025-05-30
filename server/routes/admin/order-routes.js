import express from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
} from "../../controllers/admin/order-controller.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get("/orders", getAllOrdersOfAllUsers);
adminOrderRouter.get("/details/:id", getOrderDetailsForAdmin);

export default adminOrderRouter;
