import express from "express";
import {
  createTerm,
  getAllTerms,
  getTermById,
} from "../controllers/term.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTerm);
router.get("/", protect, getAllTerms);
router.get("/:id", protect, getTermById);

export default router;