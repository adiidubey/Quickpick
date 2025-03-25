import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./src/routes/auth/authRoutes.js";
import adminProductsRouter from "./src/routes/admin/productRoutes.js";
import adminOrderRouter from "./src/routes/admin/orderRoutes.js";
import shopProductsRouter from "./src/routes/shop/productRoutes.js";
import shopCartRouter from "./src/routes/shop/cartRoutes.js";
import shopAddressRouter from "./src/routes/shop/addressRoutes.js";
import shopOrderRouter from "./src/routes/shop/orderRoutes.js";
import shopSearchRouter from "./src/routes/shop/searchRoutes.js";


dotenv.config();

mongoose
	.connect(process.env.DB_NAME)
	.then(() => console.log("DB connected"))
	.catch((error) => console.log("Error:", error));

const app = express();
const PORT = process.env.PORT;

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE", "PUT"],
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

app.get("/", (req, res) => {
	res.send("API is running...");
});

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is running on PORT: ${PORT}`);
});
