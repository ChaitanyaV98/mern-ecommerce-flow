import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserAuthenticated } from "@/store/auth-slice";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    console.log("STORED USER--", storedUser);
    if (storedUser) {
      dispatch(
        setUserAuthenticated({
          user: JSON.parse(storedUser),
        })
      );
    }

    sessionStorage.removeItem("token");
  }, []);
  // console.log(location.pathname, "location.pathname");
  console.log("Is authenticated", isAuthenticated);

  if (location.pathname === "/shop/paypal-return") {
    return <>{children}</>;
  }
  //if the user is not authenticated and trying to access any other page other than login and regiter the
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
}

export default CheckAuth;
