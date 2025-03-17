import Subject from "../models/subject.model.js";
import School from "../models/school.model.js";
import User from "../models/user.model.js";

export const createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, description, academicYear } = req.body;
    const userId = req.user.id;
    const schoolId = req.user.school;

    if (!subjectName || !subjectCode || !academicYear) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to create subjects",
      });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res
        .status(404)
        .json({ status: "error", message: "School not found" });
    }

    const existingSubject = await Subject.findOne({
      schoolId,
      subjectCode,
      academicYear,
    });

    if (existingSubject) {
      return res.status(400).json({
        status: "error",
        message: "Subject code already exists for this academic year",
      });
    }

    const newSubject = new Subject({
      schoolId,
      subjectName,
      subjectCode,
      description,
      academicYear,
      userId,
    });

    const savedSubject = await newSubject.save();
    res.status(201).json({ status: "success", data: savedSubject });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error creating subject",
    });
  }
};
