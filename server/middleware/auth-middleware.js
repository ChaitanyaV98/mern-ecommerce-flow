import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied! No token provided",
    });
  }
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedTokenInfo;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({
      success: false,
      message: "Internal server error while decryping token",
    });
  }
};

export default authMiddleware;
