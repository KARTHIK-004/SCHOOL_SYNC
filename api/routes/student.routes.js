import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  //   updateStudent,
  //   deleteStudent,
} from "../controllers/student.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createStudent);
router.get("/", protect, getAllStudents);
router.get("/:id", protect, getStudentById);
// router.put("/:id", protect, updateStudent);
// router.delete("/:id", protect, deleteStudent);

export default router;
