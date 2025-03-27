import Student from "../models/student.model.js";
import Class from "../models/class.model.js";
import Section from "../models/section.model.js";
import School from "../models/school.model.js";
import User from "../models/user.model.js";
import Parent from "../models/parent.model.js";
import bcrypt from "bcryptjs";

export const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      bloodGroup,
      email,
      password,
      admissionDate,
      birthCertificateNo,
      regNo,
      classId,
      sectionId,
      parentId,
      phone,
      religion,
      nationality,
      address,
      imageUrl,
    } = req.body;

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const userId = req.user.id;
    const schoolId = req.user.school;

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
          message: "Only school admins can create students",
        });
      }

      const school = await School.findById(schoolId);
      if (!school) {
        return res.status(403).json({
          status: "error",
          message: "School admin must be associated with a school",
        });
      }

      const existingStudent = await Student.findOne({
        email,
        schoolId: school._id,
      });

      if (existingStudent) {
        return res.status(400).json({
          status: "error",
          message:
            "A student with this email is already registered in this school",
        });
      }

      // Validate if class exists
      const validClass = await Class.findById(classId);
      if (!validClass) {
        return res.status(404).json({
          status: "error",
          message: "Class not found",
        });
      }

      // Validate if section exists
      const validSection = await Section.findById(sectionId);
      if (!validSection) {
        return res.status(404).json({
          status: "error",
          message: "Section not found",
        });
      }

      // Validate if parent exists
      const parent = await Parent.findById(parentId);
      if (!parent) {
        return res.status(404).json({
          status: "error",
          message: "Parent not found",
        });
      }

      // Check if reg number is already in use
      const existingRegNo = await Student.findOne({
        regNo,
        schoolId: school._id,
      });

      if (existingRegNo) {
        return res.status(400).json({
          status: "error",
          message: "Registration number is already in use",
        });
      }

      // Check if birth certificate number is already in use
      const existingBirthCert = await Student.findOne({
        birthCertificateNo,
        schoolId: school._id,
      });

      if (existingBirthCert) {
        return res.status(400).json({
          status: "error",
          message: "Birth certificate number is already in use",
        });
      }

      // Check that all required fields are provided
      if (
        !firstName ||
        !lastName ||
        !birthDate ||
        !gender ||
        !bloodGroup ||
        !email ||
        !password ||
        !admissionDate ||
        !birthCertificateNo ||
        !regNo ||
        !classId ||
        !sectionId ||
        !parentId ||
        !phone ||
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
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        role: "student",
        school: school._id,
      });

      const studentData = {
        firstName,
        lastName,
        birthDate,
        gender,
        bloodGroup,
        email,
        password: hashedPassword,
        admissionDate,
        birthCertificateNo,
        regNo,
        classId,
        sectionId,
        parentId,
        phone,
        religion,
        nationality,
        address,
        imageUrl: imageUrl || "./student.png",
        schoolId: school._id,
      };

      const student = await Student.create(studentData);

      // Update parent's children array
      await Parent.findByIdAndUpdate(
        parentId,
        { $push: { children: student._id } },
        { new: true }
      );

      res.status(201).json({
        status: "success",
        data: {
          student,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const students = await Student.find({ schoolId: school._id });

    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
