import ProductImage from "@/components/admin/Image";
import AdminProductTile from "@/components/admin/ProductTile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
	addNewProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
} from "@/store/admin/productSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
	image: null,
	title: "",
	description: "",
	category: "",
	brand: "",
	price: "",
	salePrice: "",
	totalStock: "",
	averageReview: 0,
};

function AdminProducts() {
	const [openProductsDialog, setOpenProductsDialog] = useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [imageFile, setImageFile] = useState(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const dispatch = useDispatch();
	const { productList } = useSelector((state) => state.adminProducts);
	const [currentEditedId, setCurrentEditedId] = useState(null);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	function onSubmit(event) {
		event.preventDefault();

		currentEditedId !== null
			? dispatch(
					editProduct({
						id: currentEditedId,
						formData,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setOpenProductsDialog(false);
						setFormData(initialFormData);
						setCurrentEditedId(null);
					}
			  })
			: dispatch(
					addNewProduct({
						...formData,
						image: uploadedImageUrl,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setOpenProductsDialog(false);
						setImageFile(null);
						setFormData(initialFormData);
						toast("Product added successfully");
					}
			  });
	}

	function handleDelete(getCurrentProductId) {
		dispatch(deleteProduct(getCurrentProductId)).then((data) => {
			if (data?.payload.success) {
				dispatch(fetchAllProducts());
			}
		});
	}

	function isFormValid() {
		return Object.keys(formData)
			.map((key) => formData[key] !== "")
			.every((item) => item);
	}

	return (
		<Fragment>
			<div className="mb-5 w-full flex justify-end">
				<Button onClick={() => setOpenProductsDialog(true)}>
					Add New Product
				</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
				{productList && productList.length > 0
					? productList.map((productItem) => (
							<AdminProductTile
								product={productItem}
								setCurrentEditedId={setCurrentEditedId}
								setOpenProductsDialog={setOpenProductsDialog}
								setFormData={setFormData}
								handleDelete={handleDelete}
							/>
					  ))
					: null}
			</div>
			<Sheet
				open={openProductsDialog}
				onOpenChange={() => {
					setOpenProductsDialog(false);
					setCurrentEditedId(null);
					setFormData(initialFormData);
				}}
			>
				<SheetContent side="right" className="overflow-auto">
					<SheetHeader>
						<SheetTitle className="text-center font-bold">
							{currentEditedId === null
								? "Add New Product"
								: "Edit Product"}
						</SheetTitle>
					</SheetHeader>
					<ProductImage
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setUploadedImageUrl={setUploadedImageUrl}
						imageLoading={imageLoading}
						setImageLoading={setImageLoading}
						isEditMode={currentEditedId !== null}
					/>
					<div className="mx-3">
						<CommonForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							formControls={addProductFormElements}
							buttonText={
								currentEditedId === null ? "Add" : "Edit"
							}
							isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	);
}

export default AdminProducts;
