import { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewAdress,
	deleteAddress,
	editAddress,
	fetchAllAddresses,
} from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const initialAddressFormData = {
	address: "",
	city: "",
	phone: "",
	pincode: "",
	notes: "",
};

function Address({ selectedId, setCurrentSelectedAddress }) {
	const [formData, setFormData] = useState(initialAddressFormData);
	const [currentEditedId, setCurrentEditedId] = useState(null);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { addressList } = useSelector((state) => state.shopAddress);

	useEffect(() => {
		dispatch(fetchAllAddresses(user?.id));
	}, [dispatch]);

	function handleManageAddress(event) {
		event.preventDefault();

		if (addressList.length >= 3 && currentEditedId === null) {
			setFormData(initialAddressFormData);
			toast("You can add max 3 addresses", {
				type: "error",
			});

			return;
		}

		currentEditedId !== null
			? dispatch(
					editAddress({
						userId: user?.id,
						addressId: currentEditedId,
						formData,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllAddresses(user?.id));
						setCurrentEditedId(null);
						setFormData(initialAddressFormData);
						toast("Address updated successfully");
					}
			  })
			: dispatch(
					addNewAdress({
						...formData,
						userId: user?.id,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllAddresses(user?.id));
						setFormData(initialAddressFormData);
					}
			  });
	}

	function handleDeleteAddress(getCurrentAddress) {
		dispatch(
			deleteAddress({
				userId: user?.id,
				addressId: getCurrentAddress._id,
			})
		).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllAddresses(user?.id));
				toast("Address deleted successfully");
			}
		});
	}

	function handleEditAddress(getCurrentAddress) {
		setCurrentEditedId(getCurrentAddress?._id);
		setFormData({
			...formData,
			address: getCurrentAddress?.address,
			city: getCurrentAddress?.city,
			phone: getCurrentAddress?.phone,
			pincode: getCurrentAddress?.pincode,
			notes: getCurrentAddress?.notes,
		});
	}

	function isFormValid() {
		return Object.keys(formData)
			.map((key) => formData[key].trim() !== "")
			.every((item) => item);
	}

	return (
		<Card>
			<div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
				{addressList && addressList.length > 0
					? addressList.map((singleAddressItem) => (
							<AddressCard
								selectedId={selectedId}
								handleDeleteAddress={handleDeleteAddress}
								addressInfo={singleAddressItem}
								handleEditAddress={handleEditAddress}
								setCurrentSelectedAddress={
									setCurrentSelectedAddress
								}
							/>
					  ))
					: null}
			</div>
			<CardHeader>
				<CardTitle>
					{currentEditedId !== null
						? "Edit Address"
						: "Add New Address"}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<CommonForm
					formControls={addressFormControls}
					formData={formData}
					setFormData={setFormData}
					buttonText={
						currentEditedId !== null
							? "Edit Address"
							: "Add New Address"
					}
					onSubmit={handleManageAddress}
					isBtnDisabled={!isFormValid()}
				/>
			</CardContent>
		</Card>
	);
}

export default Address;
