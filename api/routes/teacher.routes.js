import express from "express";
import {
  createTeacher,
  getTeachers,
} from "../controllers/teacher.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTeacher);
router.get("/get", getTeachers);

export default router;
