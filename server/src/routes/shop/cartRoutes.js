import express from "express";
import {
	addToCart,
	fetchCartItems,
	updateCartItemQty,
	deleteCartItem,
} from "../../controllers/shop/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/updatecart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

export default router;