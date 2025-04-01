import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  getTeacherByUserId,
} from "../controllers/teacher.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTeacher);
router.get("/", protect, getAllTeachers);
router.get("/:id", protect, getTeacherById);
router.get("/user/:id", getTeacherByUserId);
// router.put("/:id", protect, updateTeacher);

export default router;
