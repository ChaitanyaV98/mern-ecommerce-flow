import { Link, useNavigate } from "react-router-dom";
import { Home, ShoppingCart, UserCog, LogOut, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import { getShoppingCartItems } from "@/store/shop/cartSlice";
import UserCartWrapper from "./cart-wrapper";
import { useState, useEffect } from "react";

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logoutUser());
  }

  console.log("INheader --isAunthenticated", isAuthenticated);

  useEffect(() => {
    dispatch(getShoppingCartItems(user?.id));
  }, [dispatch]);
  function MenuItems() {
    return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Link
            className="text-sm font-medium"
            key={menuItem.id}
            to={menuItem.path}
          >
            {menuItem.label}
          </Link>
        ))}
      </nav>
    );
  }

  function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">User Cart</span>
          </Button>
          <UserCartWrapper
            cartItems={
              cartItems && cartItems?.items?.length > 0 ? cartItems.items : []
            }
          />
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <header className="sticky z-40 w-full top-0 bg-background border-b">
      <div className="flex h-16 items-center justify-between px-4 md:px-6  ">
        <Link to="/shop/home" className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          {/*This sheet is for smaller devices */}
          <SheetTrigger asChild>
            <Button variant="otline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}
export default ShoppingHeader;
