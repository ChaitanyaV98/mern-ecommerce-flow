import {
  createOrder,
  capturePayment,
} from "../../controllers/shop/order-controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);
orderRouter.post("/capture-payment", capturePayment);

export default orderRouter;
