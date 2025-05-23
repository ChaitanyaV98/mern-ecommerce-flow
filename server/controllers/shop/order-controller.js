import { paypal, paypalClient } from "../../helpers/paypal";
import Order from "../../models/Order";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    // 1. Create PayPal Order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.title,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
    });

    const response = await paypalClient().execute(request);
    const approvalUrl = response.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    // 2. Save order to DB with paymentId as PayPal order ID
    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "paypal",
      paymentStatus: paymentStatus || "unpaid",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId: response.result.id,
      payerId: "",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: approvalUrl,
      orderId: response.result.id,
    });
  } catch (e) {
    console.error("PayPal Order Create Error:", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
export const capturePayment = async (req, res) => {
  try {
    const { paypalOrderId } = req.body;

    if (!paypalOrderId) {
      return res.status(400).json({
        success: false,
        message: "PayPal Order ID is required",
      });
    }

    // Capture the payment using the PayPal SDK
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const response = await paypalClient().execute(request);

    const captureResult = response.result;
    const status = captureResult.status;
    const payerId = captureResult.payer?.payer_id;
    const paymentId = captureResult.id;

    if (status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
        status,
      });
    }

    // Update the order in your DB with payment info
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentId: paypalOrderId },
      {
        $set: {
          paymentStatus: "paid",
          payerId: payerId,
          orderStatus: "confirmed",
          orderUpdateDate: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found in DB",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      updatedOrder,
      paypalCapture: captureResult,
    });
  } catch (e) {
    console.error("PayPal Payment Capture Error:", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while capturing the payment",
    });
  }
};
