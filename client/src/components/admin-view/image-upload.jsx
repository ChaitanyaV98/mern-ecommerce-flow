import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { FileIcon } from "lucide-react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {
  const inputRef = useRef(null);
  //   function handleImageFileChange(event) {
  //     console.log("EVENT TARGET FILES", event.target.files);
  //     const selectedFile = event.target.files?.[0];
  //     console.log("SELECTED FILE ", selectedFile);
  //     if (selectedFile) {
  //       setImageFile(selectedFile);
  //     }
  //   }
  function handleImageFileChange(event) {
    try {
      const selectedFile = event.target.files?.[0];
      console.log("SELECTED FILE", selectedFile);
      if (selectedFile) {
        setImageFile(selectedFile);
      }
    } catch (err) {
      console.error("Error handling image file:", err);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  return (
    <div className="w-full max-w-md mx-auto px-4 mt-4">
      <Label className="text-lg font-semibold mb-2  block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          //if the image is not yet uploaded
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag & Drop or click to upload image</span>
          </Label>
        ) : (
          //if the image is already uploaded
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium ">
              {" "}
              {imageFile?.name || "Unnamed file"}
            </p>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only"> Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
