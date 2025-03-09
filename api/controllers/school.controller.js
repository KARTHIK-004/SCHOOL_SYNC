import User from "../models/user.model.js";
import School from "../models/school.model.js";

export const createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const schoolAdminId = req.user.id;

    const newSchool = await School.create({
      name,
      address,
      admin: schoolAdminId,
    });

    await User.findByIdAndUpdate(schoolAdminId, {
      hasCompletedOnboarding: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        school: newSchool,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
