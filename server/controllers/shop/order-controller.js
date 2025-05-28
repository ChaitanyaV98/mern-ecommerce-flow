import { paypal, paypalClient } from "../../helpers/paypal.js";
import Order from "../../models/Order.js";

import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";

// CREATE ORDER - PayPal
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
      cartId,
    } = req.body;

    // ✅ Validate input
    if (!Array.isArray(cartItems) || cartItems.length === 0 || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart items or amount",
      });
    }

    // 🧠 Prepare PayPal order
    const request = new paypal.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD", // Note: PayPal does not support INR for merchants in India
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

    const approvalUrl = response.result.links?.find(
      (link) => link.rel === "approve"
    )?.href;

    if (!approvalUrl) {
      return res.status(500).json({
        success: false,
        message: "Approval URL not returned by PayPal",
      });
    }

    // 🧾 Save order to DB
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "paypal",
      paymentStatus: paymentStatus || "unpaid",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId: response.result.id, // PayPal order ID
      payerId: "",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: approvalUrl,
      orderId: response.result.id,
      mongoOrderId: newOrder._id,
    });
  } catch (e) {
    console.error("PayPal Order Create Error:", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

// CAPTURE PAYMENT - PayPal
export const capturePayment = async (req, res) => {
  try {
    const { token, payerID, orderId } = req.body;

    if (!token || !payerID || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing token, payerID, or orderId in request body.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Update order status and PayPal transaction details
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = token;
    order.payerId = payerID;
    order.orderUpdateDate = new Date();

    // Loop through cart items and update product stock
    for (const item of order.cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found for ID: ${item.productId}`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product: ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Remove the cart
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    // Save updated order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed and payment captured successfully.",
      data: order,
    });
  } catch (error) {
    console.error("Error in capturePayment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while capturing payment.",
    });
  }
};
