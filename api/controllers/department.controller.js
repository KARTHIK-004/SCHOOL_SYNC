import Department from "../models/department.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

// Create a new department
export const createDepartment = async (req, res) => {
  try {
    const {
      departmentName,
      departmentCode,
      description,
      departmentCategory,
      departmentType,
      departmentFaculty,
      offersCourses,
      hasLabs,
      status,
    } = req.body;

    const userId = req.user.id;
    const schoolId = req.user.school;

    // Validate required fields
    if (
      !departmentName ||
      !departmentCode ||
      !description ||
      !departmentCategory ||
      !departmentType ||
      !departmentFaculty ||
      !status
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Check if user has permission
    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to create departments",
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

    // Check if department code already exists in this school
    const existingDepartment = await Department.findOne({
      schoolId,
      departmentCode,
    });

    if (existingDepartment) {
      return res.status(400).json({
        status: "error",
        message: "Department code already exists in this school",
      });
    }

    // Create new department
    const newDepartment = new Department({
      departmentName,
      departmentCode,
      description,
      departmentCategory,
      departmentType,
      departmentFaculty,
      offersCourses: offersCourses === "true",
      hasLabs: hasLabs === "true",
      status,
      schoolId,
      userId,
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json({
      status: "success",
      data: savedDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error creating department",
    });
  }
};

// Get all departments for a school
export const getDepartments = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }
    const departments = await Department.find({ schoolId: school._id });

    res.status(200).json({
      status: "success",
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching departments",
    });
  }
};

// Get a single department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.user.school;

    const department = await Department.findOne({
      _id: id,
      schoolId,
    });

    if (!department) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: department,
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching department",
    });
  }
};

// Update a department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const schoolId = req.user.school;
    const updateData = req.body;

    // Check if user has permission
    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to update departments",
      });
    }

    // Check if department exists
    const department = await Department.findOne({ _id: id, schoolId });
    if (!department) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    // Convert string boolean values to actual booleans
    if (updateData.offersCourses) {
      updateData.offersCourses = updateData.offersCourses === "yes";
    }
    if (updateData.hasLabs) {
      updateData.hasLabs = updateData.hasLabs === "yes";
    }

    // Check if updating departmentCode and if it already exists
    if (
      updateData.departmentCode &&
      updateData.departmentCode !== department.departmentCode
    ) {
      const existingDepartment = await Department.findOne({
        schoolId,
        departmentCode: updateData.departmentCode,
        _id: { $ne: id },
      });

      if (existingDepartment) {
        return res.status(400).json({
          status: "error",
          message: "Department code already exists in this school",
        });
      }
    }

    // Update department
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true, runValidators: true }
    ).populate("headOfDepartment", "firstName lastName email");

    res.status(200).json({
      status: "success",
      data: updatedDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error updating department",
    });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const schoolId = req.user.school;

    // Check if user has permission
    const user = await User.findById(userId);
    if (!user || (user.role !== "schoolAdmin" && user.role !== "admin")) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to delete departments",
      });
    }

    // Check if department exists
    const department = await Department.findOne({ _id: id, schoolId });
    if (!department) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    // Delete department
    await Department.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error deleting department",
    });
  }
};
