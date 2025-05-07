import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements, initialProductFormData } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteSingleProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice";
import { AdminProductTile } from "@/components/admin-view/product-tile";

// import { setToastMessage } from "@/store/toast-slice";

function AdminProducts() {
  const dispatch = useDispatch();
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialProductFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      const resultAction =
        currentEditedId !== null
          ? await dispatch(editProduct({ id: currentEditedId, formData }))
          : await dispatch(
              addNewProduct({
                ...formData,
                image: uploadedImageUrl,
              })
            );
      if (resultAction?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialProductFormData);
        // dispatch(
        //   setToastMessage({
        //     message: "New Product added successfully",
        //     type: "success",
        //     className: "mb-10",
        //   })
        // );
      }
    } catch (error) {
      console.log("Error while adding data", error);
    }
    // console.log("FORM DATA", formData);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  async function handleDelete(getCurrentProdId) {
    try {
      const result = await dispatch(deleteSingleProduct(getCurrentProdId));
      if (result.payload.success) {
        dispatch(fetchAllProducts());
      }
    } catch (e) {
      console.log("Error while deleting", e);
    }
  }
  console.log("productsList----", productList);
  return (
    <>
      <div className="flex justify-end mb-5 w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((item, index) => (
              <AdminProductTile
                key={index}
                product={item}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialProductFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId}
          />
          <div className="px-4">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
