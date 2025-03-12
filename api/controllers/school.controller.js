import School from "../models/school.model.js";
import User from "../models/user.model.js";

export const createSchool = async (req, res) => {
  try {
    const {
      schoolName,
      adminName,
      schoolType,
      curriculum,
      contactEmail,
      phone,
    } = req.body;

    const userId = req.user.id;

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Prevent duplicate school registration
    const existingSchool = await School.findOne({ userId });
    if (existingSchool) {
      return res.status(409).json({
        status: "error",
        message: "School already registered for this user",
      });
    }

    // Create new school
    const newSchool = await School.create({
      userId,
      schoolName,
      adminName,
      schoolType,
      curriculum,
      contactEmail,
      phone,
      hasCompletedOnboarding: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        school: newSchool,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        school,
      },
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
    const school = await School.findOne({ userId: req.user.id });

    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        school,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
