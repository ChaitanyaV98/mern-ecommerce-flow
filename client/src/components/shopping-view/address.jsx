import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { initialAddressFormData, addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddressList } from "@/store/shop/addressSlice";
import AddressCard from "./address-card";

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  async function handleManageAddress(event) {
    event.preventDefault();
    try {
      const response = await dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      );
      console.log("RESPONSE ----", response);
      if (response?.payload?.success) {
        await dispatch(fetchAllAddressList(user?.id));
        setFormData(initialAddressFormData);
      }
    } catch (e) {
      console.log("Error---", e);
    }
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        await dispatch(fetchAllAddressList(user.id));
      }
    };

    fetchData();
  }, [dispatch, user?.id]);

  console.log("ADDRESS LIST ----", addressList);
  return (
    <Card>
      <div className="mb-5  p-3  grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem, index) => (
              <AddressCard key={index} addressInfo={addressItem} />
            ))
          : null}
      </div>
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
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
