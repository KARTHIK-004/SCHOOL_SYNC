import mongoose from "mongoose";

const termSchema = new mongoose.Schema(
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
    termName: {
      type: String,
      required: true,
    },
    termCode: {
      type: String,
      required: true,
      unique: true,
    },
    shortName: {
      type: String,
    },
    academicYear: {
      type: String,
      required: true,
    },
    termType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

termSchema.index({ schoolId: 1, termName: 1 }, { unique: true });

const Term = mongoose.model("Term", termSchema);
export default Term;
