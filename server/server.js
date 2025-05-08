import express from "express";
import { connectToDb } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import adminProductRouter from "./routes/admin/product-routes.js";
import shopProductRouter from "./routes/shop/product-routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

//connect to db
connectToDb();

const allowedOrigins = ["http://localhost:5173"];

//middleware- cors config
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

//routing
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/shop/products", shopProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
