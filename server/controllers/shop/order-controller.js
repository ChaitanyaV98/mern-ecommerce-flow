import { paypal, paypalClient } from "../../helpers/paypal";
import Order from "../../models/Order";

export const createOrder = async (req, res) => {
  try {
    //In this method we are going to save the order in db
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
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // const create_payment_json = {
    //   intent: "sale",
    //   payer: {
    //     payment_method: "paypal",
    //   },
    //   redirect_urls: {
    //     return_url: "http://localhost:5173/shop/paypal-return",
    //     cancel_url: "http://localhost:5173/shop/paypal-cancel",
    //   },
    //   transactions: [
    //     {
    //       items_list: {
    //         items: cartItems.map((item) => ({
    //           name: item.title,
    //           sku: item.productId,
    //           price: item.price.toFixed(2),
    //           currency: "USD",
    //           quantity: item.quantity,
    //         })),
    //       },
    //       amount: {
    //         currency: "USD",
    //         total: totalAmount.toFixed(2),
    //       },
    //       description: "description",
    //     },
    //   ],
    // };
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

    // Save order to DB here (optional)
    // Save order to MongoDB
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
      paymentId: paypalOrderId,
      payerId: "", // Will be updated later on capture
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: approvalUrl,
      orderId: response.result.id,
    });
  } catch (e) {
    console.log("Some error occured");
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    //In this method we are going to check if the order is successful or not via paypal
  } catch (e) {
    console.log("Some error occured");
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
