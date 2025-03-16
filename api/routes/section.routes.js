import express from "express";
import {
  createSection,
  getSections,
  getSectionsByClass,
  getSectionById,
  updateSection,
  deleteSection,
} from "../controllers/section.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createSection);
router.get("/", protect, getSections);
router.get("/class/:classId", protect, getSectionsByClass);
router.get("/:id", protect, getSectionById);
router.put("/:id", protect, updateSection);
router.delete("/:id", protect, deleteSection);

export default router;
