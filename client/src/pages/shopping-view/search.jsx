import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToShoppingCart } from "@/store/shop/cartSlice";
import { getShoppingCartItems } from "@/store/shop/cartSlice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { fetchProductDetails } from "@/store/shop/productSlice";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);

  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(async () => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        await dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword]);
  console.log("Search results ---", searchResults);

  async function handleAddToCart(currentProductId, totalStock) {
    try {
      const itemsInCart = cartItems.items || [];

      // Check if the product already exists in the cart
      const existingItemIndex = itemsInCart.findIndex(
        (item) => item.productId === currentProductId
      );

      if (existingItemIndex !== -1) {
        const currentQuantity = itemsInCart[existingItemIndex].quantity;

        if (currentQuantity + 1 > totalStock) {
          alert(`Only ${currentQuantity} quantity can be added for this item`);
          return;
        }
      }

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

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8 ">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products...."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddToCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
