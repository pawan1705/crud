import USM from "../Models/UserModel.js";
import { comparePassword, hashPassword } from "../Utils/Utils.js";
import JWT from "jsonwebtoken";
export const userRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(404).send({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(404).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(404).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(404).send({ message: "Phone is Required" });
    }

    if (!address) {
      return res.status(404).send({ message: "Address is Required" });
    }

    const existingUser = await USM.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new USM({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await USM.find({}).limit(12).sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

export const userById = async (req, res) => {
  try {
    const user = await USM.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "successfully Fetched",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching single users",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await USM.findByIdAndDelete(req.params.uid);
    res.status(200).send({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Error while deleting user",
      error,
    });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const { id } = req.params;
    const user = await USM.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User  Details Updated",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating user",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email and Password",
      });
    }

    const user = await USM.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.password,
        phone: user.phone,
        address: user.password,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while login",
    });
  }
};
