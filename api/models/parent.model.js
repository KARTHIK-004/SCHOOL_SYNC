import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
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
      default: "parent",
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
    },
    contactMethod: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    incomeRange: {
      type: String,
      required: true,
    },
    religion: {
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
      default: "/parent.png",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

parentSchema.index({ schoolId: 1, email: 1 }, { unique: true });

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;
