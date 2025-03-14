import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductReducer from "./admin/productSlice";
import shopProductsSlice from "./shop/productSlice";
import shopCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: adminProductReducer,
		shopProducts: shopProductsSlice,
		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
	},
});

export default store;
