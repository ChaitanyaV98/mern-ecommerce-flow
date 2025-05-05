import mongoose from "mongoose";
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to db");
  } catch (error) {
    console.log("Connection to db failed!!", error);
    process.exit(1);
  }
};

export { connectToDb };
