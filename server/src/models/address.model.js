import mongoose from "mongoose"

const addressSchema = new mongoose.Schema(
	{
		userId: String,
		address: String,
		city: String,
		pincode: String,
		phone: String,
		notes: String,
	},
	{ timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
