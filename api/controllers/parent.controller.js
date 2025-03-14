import Parent from "../models/parent.model.js";
import School from "../models/school.model.js";

export const createParent = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const existingParent = await Parent.findOne({
      email: req.body.email,
      schoolId: school._id,
    });

    if (existingParent) {
      return res.status(400).json({
        status: "error",
        message:
          "A parent with this email is already registered in this school",
      });
    }

    const parentData = {
      ...req.body,
      schoolId: school._id,
    };

    const parent = await Parent.create(parentData);

    res.status(201).json({
      status: "success",
      data: parent,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found",
      });
    }

    const updatedParent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedParent,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found",
      });
    }

    await Parent.findByIdAndDelete(req.params.id);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAllParents = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const parents = await Parent.find({ schoolId: school._id });

    res.status(200).json({
      status: "success",
      data: parents,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: parent,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getParentsBySchool = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const parents = await Parent.find({ schoolId: school._id });

    res.status(200).json({
      status: "success",
      data: parents,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch parents",
    });
  }
};
