import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log("Connected to database"))
	.catch((err) => console.log("Some error occurred", err));

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const errMessage = err.message || "Internal Server Error";
	return res.status(statusCode).json({
		success: false,
		error: errMessage,
		statusCode,
	});
});

app.listen(3000, () => console.log("Server started"));
