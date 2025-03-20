import Section from "../models/section.model.js";
import Class from "../models/class.model.js";
import School from "../models/school.model.js";
import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";

export const createSection = async (req, res) => {
  try {
    const {
      classId,
      teacherId,
      sectionName,
      sectionCode,
      roomNumber,
      capacity,
      description,
      students = [],
    } = req.body;

    const userId = req.user.id;
    const schoolId = req.user.school;

    if (
      !userId ||
      !teacherId ||
      !sectionName ||
      !sectionCode ||
      !roomNumber ||
      !description ||
      !capacity
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
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

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({
        status: "error",
        message: "Class not found",
      });
    }

    const validTeacher = await Teacher.findById(teacherId);
    if (!validTeacher) {
      return res.status(400).json({
        status: "error",
        message: "Invalid teacher ID",
      });
    }

    const existingSection = await Section.findOne({
      classId,
      sectionCode,
    });

    if (existingSection) {
      return res.status(400).json({
        status: "error",
        message:
          "A section with this code already exists for this class and academic year",
      });
    }

    const newSection = new Section({
      userId,
      classId,
      schoolId,
      sectionName,
      sectionCode,
      teacherId,
      roomNumber,
      capacity,
      description,
      students,
    });

    const savedSection = await newSection.save();

    await Class.findByIdAndUpdate(classId, {
      $push: { sections: savedSection._id },
    });

    res.status(201).json({
      status: "success",
      data: savedSection,
    });
  } catch (error) {
    console.error("Error creating section:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while creating the section",
    });
  }
};

export const getSectionsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const schoolId = req.user.school;

    const classData = await Class.findOne({ _id: classId, schoolId });
    if (!classData) {
      return res.status(404).json({
        status: "error",
        message: "Class not found or you don't have access to it",
      });
    }

    const sections = await Section.find({ classId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching sections",
    });
  }
};

export const getSections = async (req, res) => {
  try {
    const schoolId = req.user.school;

    const sections = await Section.find({ schoolId })
      .populate("classId", "className classCode")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching sections",
    });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.user.school;

    const section = await Section.findOne({ _id: id, schoolId }).populate(
      "classId",
      "className classCode"
    );

    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: section,
    });
  } catch (error) {
    console.error("Error fetching section:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching the section",
    });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { sectionName, sectionCode, capacity, description } = req.body;

    const userId = req.user.id;
    const schoolId = req.user.school;

    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update sections",
      });
    }

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    if (section.schoolId.toString() !== schoolId.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You can only update sections for your school",
      });
    }

    if (sectionCode !== section.sectionCode) {
      const existingSection = await Section.findOne({
        classId: section.classId,
        sectionCode,
        _id: { $ne: id },
      });

      if (existingSection) {
        return res.status(400).json({
          status: "error",
          message:
            "A section with this code already exists for this class and academic year",
        });
      }
    }

    const updatedSection = await Section.findByIdAndUpdate(
      id,
      {
        sectionName,
        sectionCode,
        capacity,
        description,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while updating the section",
    });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const schoolId = req.user.school;

    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete sections",
      });
    }

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    if (section.schoolId.toString() !== schoolId.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You can only delete sections for your school",
      });
    }

    await Class.findByIdAndUpdate(section.classId, { $pull: { sections: id } });

    await Section.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the section",
    });
  }
};
