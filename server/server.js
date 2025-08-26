import dotenv from "dotenv";
import express from "express";
import { connectToDb } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import adminProductRouter from "./routes/admin/product-routes.js";
import shopProductRouter from "./routes/shop/product-routes.js";
import cartRouter from "./routes/shop/cart-routes.js";
import addressRouter from "./routes/shop/address-routes.js";
import orderRouter from "./routes/shop/order-routes.js";
import adminOrderRouter from "./routes/admin/order-routes.js";
import searchRouter from "./routes/shop/search-routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//connect to db
connectToDb();

//const allowedOrigins = [process.env.CLIENT_BASE_URL, "http://localhost:5173"];

//middleware- cors config
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],

//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );
const allowedOrigins = [process.env.CLIENT_BASE_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((o) => origin.startsWith(o))) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);

app.use(cookieParser());

app.use(express.json());

//routing
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/order", adminOrderRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", cartRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/order", orderRouter);
app.use("/api/shop/search", searchRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
