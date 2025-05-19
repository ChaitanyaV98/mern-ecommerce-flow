import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });
    await newlyCreatedAddress.save();
    return res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log("Error while adding address", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid or no userId is passed, UserId is required",
      });
    }
    const addressList = await Address.find({ userId });
    //if there is no address found we will manage in frontend

    return res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log("Error while fetching address", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const editAddress = async (req, res) => {
  try {
  } catch (e) {
    console.log("Error while editing address", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
  } catch (e) {
    console.log("Error while delete address", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
