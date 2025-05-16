import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopCartItem } from "@/store/shop/cartSlice";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button variant="outline" size="icon" className="h-8 w- rounded-full">
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
