import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductReducer from "./admin/productSlice";
import shopProductsSlice from "./shop/productSlice"
import shopCartSlice from "./shop/cartSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: adminProductReducer,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
	},
});

export default store;
