import ProductFilter from "@/components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/productSlice";
import { addToShoppingCart } from "@/store/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getShoppingCartItems } from "@/store/shop/cartSlice";
import { useLocation } from "react-router-dom";

function ShoppingListing() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    // dispatch(fetchAllFilteredProducts());
  }, [dispatch, sort, filters]);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (sectionId, optionId) => {
    const updatedFilters = { ...filters }; //get the current filters
    const currentOptions = updatedFilters[sectionId] || [];

    if (currentOptions.includes(optionId)) {
      // if the option is already present, then we filter it from currentOptions.
      updatedFilters[sectionId] = currentOptions.filter(
        (id) => id !== optionId
      );
      // If no options remain for a section, remove the section
      if (updatedFilters[sectionId].length === 0) {
        delete updatedFilters[sectionId];
      }
    } else {
      updatedFilters[sectionId] = [...currentOptions, optionId];
    }
    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  // useEffect(() => {
  //   setSort("price-lowtohigh");
  //   setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  // }, [location]);
  useEffect(() => {
    const sessionFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(sessionFilters);
    setSort("price-lowtohigh");
  }, [location.search]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    console.log(queryParams, "queryParams");

    return queryParams.join("&");
  }

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

  // console.log("CART ITEMS---", cartItems);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createSearchQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createSearchQueryString));
    }
  }, [filters]);

  // console.log("search params to string", searchParams.toString());

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] ">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-4">
          {productList && productList.length > 0
            ? productList.map((prodItem, index) => (
                <ShoppingProductTile
                  key={index}
                  product={prodItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}
export default ShoppingListing;
