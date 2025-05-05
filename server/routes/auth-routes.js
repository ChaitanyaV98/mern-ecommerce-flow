import express from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controllers/auth-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);
authRouter.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated the user!!",
    user,
  });
});

export default authRouter;
