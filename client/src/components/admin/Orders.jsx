import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./OrderDetails";

function AdminOrdersView() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Order History</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Order Date</TableHead>
							<TableHead>Order Status</TableHead>
							<TableHead>Order Price</TableHead>
							<TableHead>
								<span className="sr-only">Details</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>123456</TableCell>
							<TableCell>123</TableCell>
							<TableCell>xyz</TableCell>
							<TableCell>45</TableCell>
							<TableCell>
								<Dialog
									open={openDetailsDialog}
									onOpenChange={() => {
										setOpenDetailsDialog(false);
										// dispatch(
										// 	resetOrderDetails()
										// );
									}}
								>
									<Button
										onClick={() =>
											setOpenDetailsDialog(true)
										}
									>   
                                        View Details
										<AdminOrderDetailsView/>
									</Button>
								</Dialog>
							</TableCell>
						</TableRow>
					</TableBody>
					{/* <TableBody>
						{orderList && orderList.length > 0
							? orderList.map((orderItem) => (
									<TableRow>
										<TableCell>{orderItem?._id}</TableCell>
										<TableCell>
											{orderItem?.orderDate.split("T")[0]}
										</TableCell>
										<TableCell>
											<Badge
												className={`py-1 px-3 ${
													orderItem?.orderStatus ===
													"confirmed"
														? "bg-green-500"
														: orderItem?.orderStatus ===
														  "rejected"
														? "bg-red-600"
														: "bg-black"
												}`}
											>
												{orderItem?.orderStatus}
											</Badge>
										</TableCell>
										<TableCell>
											${orderItem?.totalAmount}
										</TableCell>
										<TableCell>
											<Dialog
												open={openDetailsDialog}
												onOpenChange={() => {
													setOpenDetailsDialog(false);
													dispatch(
														resetOrderDetails()
													);
												}}
											>
												<Button
													onClick={() =>
														handleFetchOrderDetails(
															orderItem?._id
														)
													}
												>
													View Details
												</Button>
												<ShoppingOrderDetailsView
													orderDetails={orderDetails}
												/>
											</Dialog>
										</TableCell>
									</TableRow>
							  ))
							: null}
					</TableBody> */}
				</Table>
			</CardContent>
		</Card>
	);
}

export default AdminOrdersView;
