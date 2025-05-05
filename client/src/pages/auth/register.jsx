import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
// import { setToastMessage } from "@/store/toast-slice";
import {
  registerFormControls,
  registerFormInitialStateControls,
} from "@/config";
import CommonForm from "@/components/common/form";

function AuthRegister() {
  const [formData, setFormData] = useState(registerFormInitialStateControls);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    // dispatch(registerUser(formData));
    // console.log("Clicked on on submit");
    try {
      const { payload } = await dispatch(registerUser(formData));

      if (payload?.success) {
        // dispatch(
        //   setToastMessage({
        //     message: "Register success",
        //     type: "success",
        //     className: "mb-10",
        //   })
        // );
        navigate("/auth/login");
      }
      // else {
      //   toast({ title: payload?.message || "Registration failed", variant: "destructive" });
      // }
    } catch (error) {
      // toast({ title: "Something went wrong", variant: "destructive" });
      console.error("Registration error:", error);
    }
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Register page comes here
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            to="/auth/login"
            className="ml-1 font-medium  hover:underline text-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
