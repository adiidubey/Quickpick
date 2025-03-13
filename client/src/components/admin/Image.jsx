import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const PORT = import.meta.env.VITE_BACKEND_PORT;

function ProductImage({
	imageFile,
	setImageFile,
	uploadedImageUrl,
	setUploadedImageUrl,
	imageLoading,
	setImageLoading,
	isEditMode,
}) {
	const inputRef = useRef(null);

	useEffect(() => {
		if (imageFile !== null) uploadedImageToCloudinary();
	}, [imageFile]);

	function handleImageFileChange(event) {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) setImageFile(selectedFile);
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDrop(event) {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) setImageFile(droppedFile);
	}

	function handleRemoveImage() {
		setImageFile(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	async function uploadedImageToCloudinary() {
		setImageLoading(true);
		const data = new FormData();
		data.append("my_file", imageFile);
		const response = await axios.post(
			`http://localhost:${PORT}/api/admin/products/uploadimage`,
			data
		);
		if (response.data?.success) {
			setUploadedImageUrl(response.data.result.url);
			setImageLoading(false);
		}
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={`border-2 border-dashed rounded-lg p-4 m-4 ${
					isEditMode ? "opacity-60" : ""
				}`}
			>
				<Input
					id="imageupload"
					type="file"
					className="hidden"
					ref={inputRef}
					onChange={handleImageFileChange}
					disabled={isEditMode}
				/>
				{!imageFile ? (
					<Label
						htmlFor="imageupload"
						className={`${
							isEditMode ? "cursor-not-allowed" : ""
						}flex flex-col items-center justify-center h-32 cursor-pointer`}
					>
						<UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
						<span>Drag & Drop or Click to upload image</span>
					</Label>
				) : imageLoading ? (
					<Skeleton className="h-10 bg-slate-200" />
				) : (
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<FileIcon className="w-8 text-primary mr-2 h-8" />
						</div>
						<p className="text-sm font-medium">{imageFile.name}</p>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
							onClick={handleRemoveImage}
						>
							<XIcon className="w-4 h-4" />
							<span className="sr-only">Remove File</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductImage;
