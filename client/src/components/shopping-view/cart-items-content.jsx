import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopCartItem, updateShopCartQty } from "@/store/shop/cartSlice";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);

  async function handleCartItemDelete(getCartItem) {
    try {
      await dispatch(
        deleteShopCartItem({
          userId: user?.id,
          productId: getCartItem?.productId,
        })
      );
    } catch (error) {
      console.log("Error----->>>", error);
    }
  }
  async function handleUpdateQuantity(cartItem, typeOfAction) {
    try {
      if (typeOfAction === "plus") {
        const itemsInCart = cartItems.items || [];

        //check how many items are in cart
        const existingItemIndex = itemsInCart.findIndex(
          (item) => item.productId === cartItem.productId
        );
        //check how many items are in actual stock
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === cartItem?.productId
        );
        const totalStock = productList[getCurrentProductIndex].totalStock;

        if (existingItemIndex !== -1) {
          const currentQuantity = itemsInCart[existingItemIndex].quantity;

          if (currentQuantity + 1 > totalStock) {
            alert(
              `Only ${currentQuantity} quantity can be added for this item`
            );
            return;
          }
        }
      }
      const data = await dispatch(
        updateShopCartQty({
          userId: user?.id,
          productId: cartItem?.productId,
          quantity:
            typeOfAction === "plus"
              ? cartItem?.quantity + 1
              : cartItem?.quantity - 1,
        })
      );
      if (data?.payload?.success) {
        console.log("Data updated successfully ");
      }
    } catch (error) {
      console.log("Error while updating", error);
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="h-20 w-20 rounded object-cover "
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1} //when quantity is 1 this button is disabled
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w- rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold ">
          $
          {(
            (cartItem.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-1 "
          size={20}
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
