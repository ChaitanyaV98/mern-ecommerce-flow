export const addAddress = async (req, res) => {
  try {
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
