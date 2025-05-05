import { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls, loginFormInitialStateControls } from "@/config";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { setToastMessage } from "@/store/toast-slice";
import { loginUser } from "@/store/auth-slice";

function AuthLogin() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(loginFormInitialStateControls);
  async function onSubmit(event) {
    event.preventDefault();
    // dispatch(
    //   setToastMessage({
    //     message: "Login success",
    //     type: "success",
    //     className: "mb-10",
    //   })
    // );
    try {
      const { payload } = await dispatch(loginUser(formData));
      console.log("Login Payload", payload);
    } catch (e) {
      console.log("Errorrrr---", e);
    }
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't Have an account
          <Link
            to="/auth/register"
            className="ml-1 font-medium  hover:underline text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
