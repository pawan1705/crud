import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      require: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

userModel.plugin(uniqueValidator);

const USM = mongoose.model("registration", userModel);
export default USM;
