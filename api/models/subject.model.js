import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: [true, "Subject name is required"],
    },
    subjectCode: {
      type: String,
      unique: true,
      uppercase: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    passingMark: {
      type: Number,
      min: [0, "Passing mark cannot be negative"],
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    offersCourses: {
      type: Boolean,
      default: true,
    },
    hasLabs: {
      type: Boolean,
      default: false,
    },
    hasTheory: {
      type: Boolean,
      default: false,
    },
    hasPractical: {
      type: Boolean,
      default: true,
    },
    optional: {
      type: Boolean,
      default: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    departmentCategory: {
      type: String,
      required: true,
    },
    departmentType: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
