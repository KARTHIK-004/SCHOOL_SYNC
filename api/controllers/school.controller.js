import School from "../models/school.model.js";
import User from "../models/user.model.js";

export const createSchool = async (req, res) => {
  const {
    schoolName,
    adminName,
    schoolType,
    curriculum,
    contactEmail,
    phone,
    schoolLogo,
  } = req.body;

  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.role !== "schoolAdmin") {
      return res.status(403).json({
        status: "error",
        message: "Only school admins can create schools",
      });
    }
    if (user.school) {
      return res.status(409).json({
        status: "error",
        message: "School already registered for this user",
      });
    }

    if (
      !schoolName ||
      !adminName ||
      !schoolType ||
      !curriculum ||
      !contactEmail ||
      !phone
    ) {
      return res.status(400).json({
        status: "error",
        message: "All required fields must be provided",
      });
    }

    const school = new School({
      userId,
      schoolName,
      schoolLogo,
      adminName,
      schoolType,
      curriculum,
      contactEmail,
      phone,
    });
    await school.save();

    user.school = school._id;
    await user.save();

    res.status(201).json({
      status: "success",
      data: school,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSchoolById = async (req, res) => {
  const schoolId = req.params.id;

  try {
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: school,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();

    res.status(200).json({
      status: "success",
      results: schools.length,
      data: {
        schools,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getMySchool = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId).populate("school");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!user.school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user.school,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
