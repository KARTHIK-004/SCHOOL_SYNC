import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createDepartment);
router.get("/", protect, getDepartments);
router.get("/:id", protect, getDepartmentById);
router.put("/:id", protect, updateDepartment);
router.delete("/:id", protect, deleteDepartment);

export default router;
