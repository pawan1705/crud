import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    console.log(`Successfully Connected `.blue);
  } catch (error) {
    console.error(`error in connection ${error}`.red);
  }
};
export default connectDB;
