import Teacher from "../models/teacher.model.js";
import Department from "../models/department.model.js";
import Subject from "../models/subject.model.js";
import School from "../models/school.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createTeacher = async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      emergencyContact,
      employeeId,
      department,
      educationLevel,
      qualification,
      teachingLevel,
      mainSubject,
      additionalSubject,
      contractType,
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
          message: "Only school admins can create teachers",
        });
      }

      const school = await School.findById(schoolId);
      if (!school) {
        return res.status(403).json({
          status: "error",
          message: "School admin must be associated with a school",
        });
      }

      const existingTeacher = await Teacher.findOne({
        email,
        schoolId: school._id,
      });

      if (existingTeacher) {
        return res.status(400).json({
          status: "error",
          message:
            "A teacher with this email is already registered in this school",
        });
      }

      const validDepartment = await Department.findById(department);
      if (!validDepartment) {
        return res.status(404).json({
          status: "error",
          message: "Department not found",
        });
      }

      const validMainSubject = await Subject.findById(mainSubject);
      if (!validMainSubject) {
        return res.status(404).json({
          status: "error",
          message: "Main subject not found",
        });
      }

      const validSubject = await Subject.findById(additionalSubject);
      if (!validSubject) {
        return res.status(404).json({
          status: "error",
          message: `Subject with ID ${additionalSubject} not found`,
        });
      }

      if (
        !title ||
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !phoneNumber ||
        !emergencyContact ||
        !employeeId ||
        !department ||
        !educationLevel ||
        !qualification ||
        !teachingLevel ||
        !mainSubject ||
        !additionalSubject ||
        !contractType ||
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
        role: "teacher",
        school: school._id,
      });

      const teacherData = {
        userId: newUser._id,
        schoolId: school._id,
        title,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        emergencyContact,
        employeeId,
        department,
        educationLevel,
        qualification,
        teachingLevel,
        mainSubject,
        additionalSubject,
        contractType,
        nationality,
        address,
        imageUrl: imageUrl || "/teacher.png",
      };

      const teacher = await Teacher.create(teacherData);

      res.status(201).json({
        status: "success",
        data: {
          teacher,
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

export const getAllTeachers = async (req, res) => {
  try {
    const school = await School.findOne({ userId: req.user.id });
    if (!school) {
      return res.status(403).json({
        status: "error",
        message: "School admin must be associated with a school",
      });
    }

    const teachers = await Teacher.find({ schoolId: school._id });

    res.status(200).json({
      status: "success",
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        status: "error",
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
