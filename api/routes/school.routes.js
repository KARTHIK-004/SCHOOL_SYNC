import express from "express";
import { createSchool } from "../controllers/school.controller.js";

const router = express.Router();

// Route to create a new school
router.post("/create", createSchool);

export default router;
