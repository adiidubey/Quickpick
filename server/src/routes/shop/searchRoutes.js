import express from "express";

import { searchProducts } from "../../controllers/shop/searchController.js";

const router = express.Router();

router.get("/:keyword", searchProducts);

export default router;
