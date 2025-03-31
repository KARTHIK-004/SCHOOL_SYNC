import Parent from "../models/parent.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";
import bcrypt from "bcryptjs";

export const createParent = async (req, res) => {
  const {
    title,
    firstName,
    lastName,
    email,
    password,
    relationship,
    nationalId,
    contactMethod,
    phone,
    whatsapp,
    educationLevel,
    occupation,
    incomeRange,
    religion,
    nationality,
    address,
    imageUrl,
    children = [],
  } = req.body;

  const userId = req.user.id;
  const schoolId = req.user.school;

  try {
    const user = await User.findById(userId);

    if (user.role !== "schoolAdmin") {
      return res.status(403).json({
        status: "error",
        message: "Only school admins can create schools",
      });
    }

    const school = await School.findOne(schoolId);
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const existingParent = await Parent.findOne({
      email,
      school: school._id,
    });

    if (existingParent) {
      return res.status(400).json({
        status: "error",
        message:
          "A parent with this email is already registered in this school",
      });
    }

    if (
      !title ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !relationship ||
      !nationalId ||
      !contactMethod ||
      !phone ||
      !whatsapp ||
      !educationLevel ||
      !occupation ||
      !incomeRange ||
      !religion ||
      !nationality ||
      !address
    ) {
      return res.status(400).json({
        status: "error",
        message: "All required fields must be provided",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: firstName,
      email,
      password: hashedPassword,
      role: "parent",
      school: school._id,
    });

    const parentData = {
      userId: newUser._id,
      schoolId: school._id,
      title,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      relationship,
      nationalId,
      contactMethod,
      phone,
      whatsapp,
      educationLevel,
      occupation,
      incomeRange,
      religion,
      nationality,
      address,
      imageUrl,
      children,
    };

    const parent = await Parent.create(parentData);

    res.status(201).json({
      status: "success",
      data: {
        parent,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
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

export const getParentByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const parent = await Parent.findOne({ userId });

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: parent,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error while fetching parent",
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

    const parents = await Parent.find({ userId: req.user.id });

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
