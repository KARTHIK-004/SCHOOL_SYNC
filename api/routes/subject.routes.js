import express from "express";
import {
  createSubject,
  //   getSubjects,
  //   getSubjectById,
  //   updateSubject,
  //   deleteSubject,
} from "../controllers/subject.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createSubject);
// router.get("/", protect, getSubjects);
// router.get("/:id", protect, getSubjectById);
// router.put("/:id", protect, updateSubject);
// router.delete("/:id", protect, deleteSubject);

export default router;
