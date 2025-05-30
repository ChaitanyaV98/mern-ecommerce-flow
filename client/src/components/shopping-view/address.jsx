import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { initialAddressFormData, addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteUserAddress,
  fetchAllAddressList,
  updateAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./address-card";

function Address({ setCurrentSelectedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    if (addressList && addressList.length > 0) {
      setCurrentSelectedAddress(addressList[0]);
    }
  }, [addressList]);

  //   async function handleManageAddress(event) {
  //     event.preventDefault();
  //     try {
  //       const response =
  //         currentEditedId !== null
  //           ? await dispatch(
  //               updateAddress({
  //                 userId: user?.id,
  //                 addressId: currentEditedId,
  //                 formData,
  //               })
  //             )
  //           : await dispatch(
  //               addNewAddress({
  //                 ...formData,
  //                 userId: user?.id,
  //               })
  //             );

  //       if (response?.payload?.success) {
  //         await dispatch(fetchAllAddressList(user?.id));
  //         setCurrentEditedId(null);
  //         setFormData(initialAddressFormData);
  //       }
  //     } catch (e) {
  //       console.log("Error---", e);
  //     }
  //   }
  async function handleManageAddress(event) {
    event.preventDefault();
    // Prevent user from adding more than 3 addresses
    if (currentEditedId === null && addressList.length >= 3) {
      alert("You can only add up to 3 addresses.");
      setFormData(initialAddressFormData);
      return;
    }

    try {
      let response;

      if (currentEditedId !== null) {
        response = await dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        );
      } else {
        response = await dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        );
      }

      if (response?.payload?.success) {
        await dispatch(fetchAllAddressList(user?.id));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
      } else {
        console.error("Address operation failed:", response);
      }
    } catch (e) {
      console.error("Error managing address:", e);
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

  async function handleDeleteAddress(currentAddress) {
    console.log("Current address in Delete", currentAddress);
    try {
      const respose = await dispatch(
        deleteUserAddress({
          userId: currentAddress.userId,
          addressId: currentAddress._id,
        })
      );
      if (respose?.payload?.success) {
        await dispatch(fetchAllAddressList(user?.id));
      }
    } catch (e) {
      console.log("Error while deleting", e);
    }
  }

  function handleEditAddress(currentAddress) {
    console.log("Current address in Edit", currentAddress);
    setCurrentEditedId(currentAddress?._id);
    setFormData({
      ...formData,
      address: currentAddress?.address,
      city: currentAddress?.city,
      phone: currentAddress?.phone,
      pincode: currentAddress?.pincode,
      notes: currentAddress?.notes,
    });
  }
  return (
    <Card>
      <div className="mb-5  p-3  grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem, index) => (
              <AddressCard
                key={index}
                addressInfo={addressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
