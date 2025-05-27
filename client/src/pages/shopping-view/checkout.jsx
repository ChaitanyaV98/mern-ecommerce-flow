import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  async function handleInitiatePaypalPayment() {
    try {
      const orderData = {
        userId: user?.id,
        cartItems: cartItems.items.map((singleCart) => ({
          productId: singleCart?.productId,
          title: singleCart?.title,
          image: singleCart?.image,
          price:
            singleCart?.salePrice > 0
              ? singleCart?.salePrice
              : singleCart?.price,
          quantity: singleCart?.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          notes: currentSelectedAddress?.notes,
        },
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "pending",
        totalAmount: totalCartAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      };

      const createOrderResponse = await dispatch(createNewOrder(orderData));

      if (createOrderResponse?.payload?.success) {
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsPaymentStarted(true);
      }
      if (approvalURL) {
        window.location.href = approvalURL;
      }
    } catch (e) {
      console.log("Error while create order handle", e);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, index) => (
                <UserCartItemsContent key={index} cartItem={item} />
              ))
            : null}
          <div className="mt-8 pace-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total </span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4  ">
            <Button onClick={handleInitiatePaypalPayment} className=" w-full ">
              Checkout with paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShoppingCheckout;
