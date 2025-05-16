import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToShoppingCart } from "@/store/shop/cartSlice";
import { getShoppingCartItems } from "@/store/shop/cartSlice";
import { setProductDetails } from "@/store/shop/productSlice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  async function handleAddToCart(currentProductId) {
    try {
      console.log(currentProductId, "currentProductId");

      const resultAction = await dispatch(
        addToShoppingCart({
          userId: user.id,
          productId: currentProductId,
          quantity: 1,
        })
      );

      console.log("Product added successfully:", resultAction.payload);
      // Optional: handle result
      if (resultAction.payload) {
        await dispatch(getShoppingCartItems(user?.id));
      }

      if (resultAction.error) {
        console.error("Failed to add product:", resultAction.error);
      }
    } catch (e) {
      console.log("Error while adding prod", e);
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails);
  }
  return (
    <Dialog open={open} onOpenChange={hanDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-sqaure w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-bold ">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4  ">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5 ">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              onClick={() => handleAddToCart(productDetails?._id)}
              className="w-full outline-none"
            >
              Add to Cart
            </Button>
          </div>
          <Separator />

          {/*Here comes the review functionality */}

          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6 ">
              {/*all review goes here*/}
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="h-10 w-10 border">
                    VC
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Chaitanya Vadthya</h3>
                  </div>
                  <div className="flex items-center gap-0.5 ">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    Here comes the product review
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="h-10 w-10 border">
                    VC
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Chaitanya Vadthya</h3>
                  </div>
                  <div className="flex items-center gap-0.5 ">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    Here comes the product review
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="h-10 w-10 border">
                    VC
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Chaitanya Vadthya</h3>
                  </div>
                  <div className="flex items-center gap-0.5 ">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    Here comes the product review
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a review" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
