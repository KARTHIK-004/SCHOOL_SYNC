import express from "express";
import {
  createParent,
  deleteParent,
  getAllParents,
  getParentById,
  getParentsBySchool,
  updateParent,
} from "../controllers/parent.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createParent);
router.put("/:id", protect, updateParent);
router.delete("/:id", protect, deleteParent);
router.get("/", protect, getAllParents);
router.get("'/school/:schoolId", getParentsBySchool);
router.get("/:id", getParentById);

export default router;
