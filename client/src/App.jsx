import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminFeatures from "./pages/admin/Features";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./components/admin/Orders";
import ShoppingLayout from "./components/shop/Layout";
import NotFound from "./pages/notfound/Notfound";
import ShoppingListing from "./pages/shop/Listing";
import ShoppingHome from "./pages/shop/Home";
import ShoppingCheckout from "./pages/shop/Checkout";
import ShoppingAccount from "./pages/shop/Account";
import CheckAuth from "./components/common/CheckAuth";
import { UnAuthPage } from "./pages/notfound/UnauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthUser } from "./store/auth/authSlice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/shop/PaypalReturn";
import PaymentSuccessPage from "./pages/shop/PaymentSuccess";

function App() {
	const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(checkAuthUser())
    },[dispatch])

    if (isLoading) return <Skeleton className="w-full h-screen bg-slate-300" />;


	return (
		<>
			<div className="flex flex-col overflow-hidden bg-white">
				<Routes>
					<Route
						path="/auth"
						element={
							<CheckAuth
								isAuthenticated={isAuthenticated}
								user={user}
							>
								<AuthLayout />
							</CheckAuth>
						}
					>
						<Route path="login" element={<AuthLogin />} />
						<Route path="register" element={<AuthRegister />} />
					</Route>

					<Route
						path="/admin"
						element={
							<CheckAuth
								isAuthenticated={isAuthenticated}
								user={user}
							>
								<AdminLayout />
							</CheckAuth>
						}
					>
						<Route path="dashboard" element={<AdminDashboard />} />
						<Route path="features" element={<AdminFeatures />} />
						<Route path="products" element={<AdminProducts />} />
						<Route path="orders" element={<AdminOrders />} />
					</Route>

					<Route
						path="/shop"
						element={
							<CheckAuth
								isAuthenticated={isAuthenticated}
								user={user}
							>
								<ShoppingLayout />
							</CheckAuth>
						}
					>
						<Route path="listing" element={<ShoppingListing />} />
						<Route path="home" element={<ShoppingHome />} />
						<Route path="checkout" element={<ShoppingCheckout />} />
						<Route path="account" element={<ShoppingAccount />} />
						<Route path="paypal-return" element={<PaypalReturnPage />} />
						<Route path="payment-success" element={<PaymentSuccessPage />} />
					</Route>

					<Route path="*" element={<NotFound />}></Route>
					<Route path="/unauthpage" element={<UnAuthPage />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
