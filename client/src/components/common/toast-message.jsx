import React from "react";
import CheckIcon from "@/icons/Check";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { clearToast } from "@/store/toast-slice";
import TickIcon from "@/icons/TickIcon";
import Error from "@/icons/Error";
import Warning from "@/icons/Warning";

const ToastComponent = () => {
  const { message, showToast, type, className } = useSelector(
    (state) => state.toast.toast
  );

  const dispatch = useDispatch();

  const toastUIConfig = {
    error: {
      backgroundColor: "bg-[#AB404A]",
      textColor: "text-white",
      Icon: Error,
    },
    success: {
      backgroundColor: "bg-[#057D45]",
      textColor: "text-white",
      Icon: TickIcon,
    },
    warning: {
      backgroundColor: "bg-[#B17D05]",
      textColor: "text-white",
      Icon: Warning,
    },
    neutral: {
      backgroundColor: "bg-[#212121]",
      textColor: "text-white",
      Icon: CheckIcon,
    },
  };
  const Prefix = toastUIConfig[type]?.Icon;

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(clearToast());
    }, 10000);
  }, [showToast]);

  if (!showToast) {
    return <></>;
  }

  return (
    <div
      className={twMerge(
        "absolute bottom-6 left-1/2 -translate-x-1/2 w-1/2 bg-[#B17D05] text-white rounded-lg px-2 py-2 font-bold flex items-center gap-x-2 z-[9999]",
        className
      )}
    >
      <Prefix color="#fff" />
      {message}
    </div>
  );
};

export default ToastComponent;
