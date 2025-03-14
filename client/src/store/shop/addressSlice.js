import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PORT = import.meta.env.VITE_BACKEND_PORT;

const initialState = {
	isLoading: false,
	addressList: [],
};

export const addNewAdress = createAsyncThunk(
	"addresses/addNewAddress",
	async (formData) => {
		const response = await axios.post(
			`http://localhost:${PORT}/api/shop/address/add`,
			formData
		);

		return response.data;
	}
);

export const fetchAllAddresses = createAsyncThunk(
	"addresses/fetchAllAddresses",
	async (userId) => {
		const response = await axios.get(
			`http://localhost:${PORT}/api/shop/address/get/${userId}`
		);

		return response.data;
	}
);

export const editAddress = createAsyncThunk(
	"addresses/editAddress",
	async ({ userId, addressId, formData }) => {
		const response = await axios.put(
			`http://localhost:${PORT}/api/shop/address/update/${userId}/${addressId}`,
			formData
		);

		return response.data;
	}
);

export const deleteAddress = createAsyncThunk(
	"addresses/deleteAddress",
	async ({ userId, addressId }) => {
		const response = await axios.delete(
			`http://localhost:${PORT}/api/shop/address/delete/${userId}/${addressId}`
		);

		return response.data;
	}
);

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addNewAdress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addNewAdress.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(addNewAdress.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchAllAddresses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllAddresses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addressList = action.payload.data;
			})
			.addCase(fetchAllAddresses.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			})
	},
});


export default addressSlice.reducer;