import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createClass);
router.get("/", protect, getClasses);
router.get("/:id", protect, getClassById);
router.put("/:id", protect, updateClass);
router.delete("/:id", protect, deleteClass);

export default router;
