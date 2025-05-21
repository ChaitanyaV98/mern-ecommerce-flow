import { Dialog, DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import CommonForm from "../common/form";
function AdminOrderDetailsView() {
  const initialFormData = {
    status: "",
  };

  function handleUpdateStatus(event) {
    event.preventDefault();
  }
  const [formData, setFormData] = useState(initialFormData);
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="mt-6 flex items-center justify-between">
            <p className="font-medium ">
              Order Id
              <Label>123456 </Label>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium ">
              Order Date
              <Label>20/5/2025 </Label>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium ">
              Order Status
              <Label>In process </Label>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium ">
              Order Price
              <Label>$1000 </Label>
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2 ">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3 ">
              <li className="flex items-center justify-between">
                <span>Product one </span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Chaitanya</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
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
