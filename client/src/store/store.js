import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminProductReducer from "./admin/productSlice";
import adminOrderSlice from "./admin/orderSlice";
import shopProductsSlice from "./shop/productSlice";
import shopCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";
import shopSearchSlice from "./shop/searchSlice";
import shopReviewSlice from "./shop/reviewSlice";
import commonFeatureSlice from "./commonSlice/index"

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: adminProductReducer,
		shopProducts: shopProductsSlice,
		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
		shopOrder: shopOrderSlice,
		adminOrder: adminOrderSlice,
		shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,
        commonFeature: commonFeatureSlice,
	},
});

export default store;
