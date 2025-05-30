import express from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order-controller.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get("/orders", getAllOrdersOfAllUsers);
adminOrderRouter.get("/details/:id", getOrderDetailsForAdmin);
adminOrderRouter.put("/update/:id", updateOrderStatus);

export default adminOrderRouter;
