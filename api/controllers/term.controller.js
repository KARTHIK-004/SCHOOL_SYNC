import Term from "../models/term.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

export const createTerm = async (req, res) => {
  try {
    const {
      termName,
      termCode,
      shortName,
      academicYear,
      termType,
      startDate,
      endDate,
      description,
    } = req.body;

    const userId = req.user.id;
    const schoolId = req.user.school;

    if (
      !termName ||
      !termCode ||
      !academicYear ||
      !termType ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to create terms",
      });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        status: "error",
        message: "School not found",
      });
    }

    const existingTermByCode = await Term.findOne({
      termCode,
    });

    if (existingTermByCode) {
      return res.status(400).json({
        status: "error",
        message: "Term code already exists",
      });
    }

    const existingTermByName = await Term.findOne({
      schoolId,
      termName,
    });

    if (existingTermByName) {
      return res.status(400).json({
        status: "error",
        message: "Term name already exists in this school",
      });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        status: "error",
        message: "End date must be after start date",
      });
    }

    const newTerm = new Term({
      termName,
      termCode,
      shortName,
      academicYear,
      termType,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      description,
      schoolId,
      userId,
    });

    const savedTerm = await newTerm.save();
    res.status(201).json({
      status: "success",
      data: savedTerm,
    });
  } catch (error) {
    console.error("Error creating term:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error creating term",
    });
  }
};

export const getAllTerms = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }
    const terms = await Term.find({ schoolId: school._id });

    res.status(200).json({
      status: "success",
      data: terms,
    });
  } catch (error) {
    console.error("Error fetching terms:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching terms",
    });
  }
};

export const getTermById = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.user.school;

    const term = await Term.findOne({
      _id: id,
      schoolId,
    });

    if (!term) {
      return res.status(404).json({
        status: "error",
        message: "Term not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: term,
    });
  } catch (error) {
    console.error("Error fetching term:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching term",
    });
  }
};
