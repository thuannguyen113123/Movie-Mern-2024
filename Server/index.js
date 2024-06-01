import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/configs/db.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import reviewRoute from "./src/routes/reivew.route.js";

//Cấu hình env(môi trường)
dotenv.config();

const app = express();

// //Kết nối cơ sở dữ liệu
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/review", reviewRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
