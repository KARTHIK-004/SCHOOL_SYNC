import Subject from "../models/subject.model.js";
import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import School from "../models/school.model.js";

export const createSubject = async (req, res) => {
  try {
    const {
      subjectName,
      subjectCode,
      shortName,
      passingMark,
      academicYear,
      offersCourses,
      hasLabs,
      hasTheory,
      hasPractical,
      optional,
      department,
      departmentCategory,
      departmentType,
      courseType,
    } = req.body;

    const userId = req.user.id;
    const schoolId = req.user.school;

    // Validate required fields
    if (
      !subjectName ||
      !subjectCode ||
      !shortName ||
      !passingMark ||
      !academicYear ||
      !department ||
      !departmentCategory ||
      !departmentType ||
      !courseType
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to create subjects",
      });
    }

    // Check if school exists
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }

    // Check if subject code exists
    const existingSubject = await Subject.findOne({ subjectCode });
    if (existingSubject) {
      return res.status(400).json({
        status: "error",
        message: "Subject code already exists",
      });
    }

    // Check department exists
    const validDepartment = await Department.findById(department);
    if (!validDepartment) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    // Create new subject
    const newSubject = new Subject({
      subjectName,
      subjectCode,
      shortName,
      passingMark,
      academicYear,
      offersCourses: offersCourses === "false",
      hasLabs: hasLabs === "true",
      hasTheory: hasTheory === "true",
      hasPractical: hasPractical === "true",
      optional: optional === "true",
      department,
      departmentCategory,
      departmentType,
      courseType,
      schoolId: req.user.school,
      userId,
    });

    const savedSubject = await newSubject.save();
    res.status(201).json({
      status: "success",
      data: savedSubject,
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error creating subject",
    });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const subjects = await Subject.find({ schoolId: school._id }).populate({
      path: "department",
      select: "departmentName",
    });

    res.status(200).json({
      status: "success",
      data: subjects,
    });
  } catch (error) {
    console.error("Error getting subjects:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error getting subjects",
    });
  }
};
