export const createOrder = async (req, res) => {
  try {
    //In this method we are going to save the order in db
  } catch (e) {
    console.log("Some error occured");
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

export const capturePayment = async (req, res) => {
  try {
    //In this method we are going to check if the order is successful or not via paypal
  } catch (e) {
    console.log("Some error occured");
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
