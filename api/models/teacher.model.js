import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    role: {
      type: String,
      default: "teacher",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      unique: true,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    teachingLevel: {
      type: String,
      required: true,
    },
    mainSubject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    additionalSubject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    contractType: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "/teacher.png",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
