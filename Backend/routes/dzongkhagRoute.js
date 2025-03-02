import express from "express";
import { getDzongkhags, getGewogsByDzongkhag, getChiwogsByGewog } from "../controllers/dzongkhagController.js";

const router = express.Router();

router.get("/dzongkhags", getDzongkhags);
router.get("/gewogs/:dzongkhagId", getGewogsByDzongkhag);
router.get("/chiwogs/:gewogId", getChiwogsByGewog);

export default router;
