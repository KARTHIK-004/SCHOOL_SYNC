import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
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
    contactMethods: {
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
