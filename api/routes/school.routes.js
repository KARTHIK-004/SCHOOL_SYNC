import express from "express";
import {
  createSchool,
  getSchoolById,
  getSchools,
} from "../controllers/school.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createSchool);
router.get("/", getSchools);
router.get("/:id", getSchoolById);

export default router;
