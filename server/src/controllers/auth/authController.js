import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import express from "express";

const registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		const checkUser = await User.findOne({ email });
		if (checkUser)
			return res.json({
				success: false,
				message: "User already exist with this email",
			});

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = new User({
			userName,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({
			success: true,
			message: "Registration successfull",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Error occured",
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const checkUser = await User.findOne({ email });
		if (!checkUser)
			return res.json({
				success: false,
				message: "User doesn't exist!",
			});

		const checkPasswordMatch = await bcrypt.compare(
			password,
			checkUser.password
		);
		if (!checkPasswordMatch)
			return res.json({
				success: false,
				message: "Invalid Password",
			});

		const token = jwt.sign(
			{
				id: checkUser._id,
				role: checkUser.role,
				email: checkUser.email,
				userName: checkUser.userName,
			},
			process.env.CLIENT_SECRET_KEY,
			{ expiresIn: "120m" }
		);

		res.cookie("token", token, { httpOnly: true, secure: false }).json({
			success: true,
			message: "Logged in successfully",
			user: {
				email: checkUser.email,
				role: checkUser.role,
				id: checkUser._id,
				userName: checkUser.userName,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Error occured",
		});
	}
};

const logoutUser = (req, res) => {
	res.clearCookie("token").json({
		success: true,
		message: "Logged out successfully",
	});
};

const authMiddleware = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token)
		return res.status(401).json({
			success: false,
			message: "Unauthorised user",
		});

	try {
		const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			success: false,
			message: "Unauthorised user",
		});
	}
};

export { registerUser, loginUser, logoutUser, authMiddleware };
