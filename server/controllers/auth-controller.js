import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//register
export const registerUser = async (req, res) => {
  try {
    console.log("REQ BODYY---", req.body);
    const { username, email, password } = req.body;
    console.log("USERNMAE", username, email, password);
    const checkIfUserExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkIfUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists! Try with different username or email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        // role: role || "user",
      });
      await newUser.save();
      if (newUser) {
        return res.status(201).json({
          success: true,
          message: "User registered to db successfully",
        });
      }
      res.status(400).json({
        success: false,
        message: "Unable to register the user! Please try again",
      });
    }
  } catch (e) {
    console.log("Error while register", e);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      res.status(400).json({
        success: false,
        message: "User doesnt exist! Please register first",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    });
  } catch (e) {
    console.log("Error while login", e);
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//logout

export const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};
