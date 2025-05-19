import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { initialAddressFormData, addressFormControls } from "@/config";
import CommonForm from "../common/form";

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  function handleManageAddress(event) {
    event.preventDefault();
  }
  return (
    <Card>
      <div>Address List</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText="Add"
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
