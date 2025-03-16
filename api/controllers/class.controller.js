import Class from "../models/class.model.js";
import School from "../models/school.model.js";
import User from "../models/user.model.js";

export const createClass = async (req, res) => {
  try {
    const { className, classCode, description, academicYear } = req.body;
    const userId = req.user.id;
    const schoolId = req.user.school;

    // Validate required fields
    if (!className || !classCode || !academicYear) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to create classes",
      });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }

    const existingClass = await Class.findOne({
      schoolId,
      classCode,
      academicYear,
    });

    if (existingClass) {
      return res.status(400).json({
        status: "error",
        message: "A class with this code already exists for this academic year",
      });
    }

    const newClass = new Class({
      userId,
      schoolId,
      className,
      classCode,
      description,
      academicYear,
    });

    const savedClass = await newClass.save();

    res.status(201).json({
      status: "success",
      data: savedClass,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while creating the class",
    });
  }
};

export const getClasses = async (req, res) => {
  try {
    const schoolId = req.user.school;

    const classes = await Class.find({ schoolId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching classes",
    });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id);

    if (!classData) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: classData,
    });
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the class",
    });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { className, classCode, description, academicYear, isActive } =
      req.body;
    const userId = req.user.id;
    const schoolId = req.user.school;

    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update classes",
      });
    }

    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    if (classData.schoolId.toString() !== schoolId.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You can only update classes for your school",
      });
    }

    if (classCode !== classData.classCode) {
      const existingClass = await Class.findOne({
        schoolId,
        classCode,
        academicYear,
        _id: { $ne: id },
      });

      if (existingClass) {
        return res.status(400).json({
          status: "error",
          message:
            "A class with this code already exists for this academic year",
        });
      }
    }

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      {
        className,
        classCode,
        description,
        academicYear,
        isActive,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedClass,
    });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while updating the class",
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const schoolId = req.user.school;

    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete classes",
      });
    }

    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    if (classData.schoolId.toString() !== schoolId.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You can only delete classes for your school",
      });
    }

    await Class.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the class",
    });
  }
};
