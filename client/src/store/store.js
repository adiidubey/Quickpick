import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductReducer from "./admin/productSlice";
import adminOrderSlice from "./admin/orderSlice";
import shopProductsSlice from "./shop/productSlice";
import shopCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: adminProductReducer,
		shopProducts: shopProductsSlice,
		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
		shopOrder: shopOrderSlice,
		adminOrder: adminOrderSlice,
	},
});

export default store;
