import { imageUploadUtil } from "../../helpers/cloudinary.js";

export const handleImageUpload = async (req, res) => {
  try {
    //convert the file to base 64 format
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    // const url = "data:" + req.file.mimetype + ";base64" + b64;
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    return res.json({
      success: true,
      result,
    });
  } catch (e) {
    console.log("Error in handle image upload", e);
    return res.status(500).json({
      success: false,
      message: "Error occured! Please try again ",
    });
  }
};
