import UserCartItemsContent from "@/components/shop/CartItemscontent";
import img from "@/assets/account.jpg";
import Address from "@/components/shop/Address";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/orderSlice";
import { toast } from "sonner";

function ShoppingCheckout() {
	const { cartItems } = useSelector((state) => state.shopCart);
	const { user } = useSelector((state) => state.auth);
	const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
	const [isPaymentStart, setIsPaymentStart] = useState(false);
	const dispatch = useDispatch();
	const { approvalURL } = useSelector((state) => state.shopOrder);

	const totalCartAmount =
		cartItems && cartItems.items && cartItems.items.length > 0
			? cartItems.items.reduce(
					(sum, currentItem) =>
						sum +
						(currentItem?.salePrice > 0
							? currentItem?.salePrice
							: currentItem?.price) *
							currentItem?.quantity,
					0
			  )
			: 0;

	function handleInitiatePaypalPayment() {
        console.log(cartItems.items.length, "aditya")
        if (!cartItems.items.length) {
			toast("Cart is empty", {
				type: "error",
			});
			return;
		}

		if (!currentSelectedAddress) {
			toast("Please select an address to proceed", {
				type: "error",
			});
            return;
		}

		const orderData = {
			userId: user?.id,
			cartId: cartItems?._id,
			cartItems: cartItems.items.map((singleCartItem) => ({
				productId: singleCartItem?.productId,
				title: singleCartItem?.title,
				image: singleCartItem?.image,
				price:
					singleCartItem?.salePrice > 0
						? singleCartItem?.salePrice
						: singleCartItem?.price,
				quantity: singleCartItem?.quantity,
			})),
			addressInfo: {
				addressId: currentSelectedAddress?._id,
				address: currentSelectedAddress?.address,
				city: currentSelectedAddress?.city,
				pincode: currentSelectedAddress?.pincode,
				phone: currentSelectedAddress?.phone,
				notes: currentSelectedAddress?.notes,
			},
			orderStatus: "pending",
			paymentMethod: "paypal",
			paymentStatus: "pending",
			totalAmount: totalCartAmount,
			orderDate: new Date(),
			orderUpdateDate: new Date(),
			paymentId: "",
			payerId: "",
		};
		dispatch(createNewOrder(orderData)).then((data) => {
			if (data?.payload?.success) {
				setIsPaymentStart(true);
			} else {
				setIsPaymentStart(false);
			}
		});
	}

	if (approvalURL) {
		window.location.href = approvalURL;
	}

	return (
		<div className="flex flex-col">
			<div className="relative h-[300px] w-full overflow-hidden">
				<img
					src={img}
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
				<Address
					selectedId={currentSelectedAddress}
					setCurrentSelectedAddress={setCurrentSelectedAddress}
				/>
				<div className="flex flex-col gap-4">
					{cartItems && cartItems.items && cartItems.items.length > 0
						? cartItems.items.map((item) => (
								<UserCartItemsContent cartItem={item} />
						  ))
						: null}
					<div className="mt-8 space-y-4">
						<div className="flex justify-between">
							<span className="font-bold">Total</span>
							<span className="font-bold">
								${totalCartAmount}
							</span>
						</div>
					</div>
					<div className="mt-4 w-full">
						<Button
							onClick={handleInitiatePaypalPayment}
							className="w-full"
						>
							Checkout
							{isPaymentStart
								? "Processing Paypal Payment..."
								: "Checkout with Paypal"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCheckout;
