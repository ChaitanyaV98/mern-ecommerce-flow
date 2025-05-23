import {
  createOrder,
  capturePayment,
} from "../../controllers/shop/order-controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);

export default orderRouter;
