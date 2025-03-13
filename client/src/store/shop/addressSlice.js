import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	addressList: [],
};

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
        
    },
});
