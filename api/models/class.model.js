import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
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
    className: {
      type: String,
      required: true,
    },
    classCode: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);
export default Class;
