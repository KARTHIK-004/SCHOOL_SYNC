import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
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
    departmentName: {
      type: String,
      required: true,
      trim: true,
    },
    departmentCode: {
      type: String,
      required: true,
      unique: true,
    },
    departmentCategory: {
      type: String,
      required: true,
    },
    departmentType: {
      type: String,
      required: true,
    },
    departmentFaculty: {
      type: String,
      required: true,
    },
    status: {
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
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

departmentSchema.index({ schoolId: 1, departmentCode: 1 }, { unique: true });

const Department = mongoose.model("Department", departmentSchema);

export default Department;
