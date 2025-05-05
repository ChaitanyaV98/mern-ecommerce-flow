import { Outlet } from "react-router-dom";
import ToastComponent from "../common/toast-message";

function AuthLayout() {
  return (
    <div className="min-h-screen flex w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ecommerce shopping
          </h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
        <ToastComponent />
      </div>
    </div>
  );
}
export default AuthLayout;
