import { Dialog, DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import CommonForm from "../common/form";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
function AdminOrderDetailsView({ orderDetails }) {
  const initialFormData = {
    status: "",
  };

  function handleUpdateStatus(event) {
    event.preventDefault();
  }
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="mt-6 flex items-center justify-between">
            <p className="font-medium ">
              Order Id
              <Label>{orderDetails?._id} </Label>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium ">
              Order Date
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </p>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium ">
              Order Status
              <Label>
                {" "}
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>{" "}
              </Label>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium ">
              Order Price
              <Label>${orderDetails?.totalAmount} </Label>
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2 ">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.username}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inshipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered " },
                  { id: "rejected", label: "Rejected " },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}
export default AdminOrderDetailsView;
