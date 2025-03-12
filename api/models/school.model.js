import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    schoolLogo: {
      type: String,
      default: "/Logo.png",
    },
    adminName: {
      type: String,
      required: true,
    },
    schoolType: {
      type: String,
      enum: ["primary", "secondary", "high", "higher_secondary"],
      required: true,
    },
    curriculum: {
      type: String,
      enum: ["national", "international", "state", "cbse", "icse"],
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hasCompletedOnboarding: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model("School", schoolSchema);
export default School;
