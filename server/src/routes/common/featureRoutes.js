import express from "express";
import {getFeatureImages, addFeatureImage} from "../../controllers/common/featuresController.js"

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

export default router;