import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";

import {
  titles,
  countries,
  educationLevels,
  qualifications,
  teachingLevels,
  contractTypes,
} from "@/lib/formOption";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllDepartments } from "@/utils/departmentAPI";
import { getAllSubjects } from "@/utils/subjectAPI";
import { createTeacher } from "@/utils/teacherAPI";

export default function TeacherForm({ editingId, initialData }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/teacher.png"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      phoneNumber: initialData?.phoneNumber || "",
      emergencyContact: initialData?.emergencyContact || "",
      employeeId: initialData?.employeeId || "",
      department: initialData?.department || "",
      educationLevel: initialData?.educationLevel || "",
      qualification: initialData?.qualification || "",
      teachingLevel: initialData?.teachingLevel || "",
      mainSubject: initialData?.mainSubject || "",
      additionalSubject: initialData?.additionalSubject || "",
      contractType: initialData?.contractType || "",
      nationality: initialData?.nationality || "",
      address: initialData?.address || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();

        // Get departments
        const deptResponse = await getAllDepartments(userData);
        const departments = deptResponse.data.data || [];
        const departmentOptions = departments.map((department) => ({
          value: department._id,
          label: department.departmentName,
        }));
        setDepartments(departmentOptions);

        // Get subjects
        const subjectResponse = await getAllSubjects(userData);
        const subjects = subjectResponse.data || [];
        const subjectOptions = subjects.map((subject) => ({
          value: subject._id,
          label: subject.subjectName,
        }));
        setSubjects(subjectOptions);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast({
          variant: "destructive",
          title: "Error fetching departments",
          description: error.message || "Please try again later.",
        });
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [toast]);

  async function onSubmit(formData) {
    try {
      setLoading(true);
      if (editingId) {
        // await updateTeacher(formData);
        setLoading(false);
        toast({
          title: "Success",
          description: "Teacher updated successfully!",
          variant: "success",
        });
        navigate("/dashboard/teachers");
      } else {
        await createTeacher(formData);
        setLoading(false);
        toast({
          title: "Success",
          description: "Teacher created successfully!",
          variant: "success",
        });
        // navigate("/dashboard/teachers");
        // reset();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save subject",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/teachers"
        parent="academics"
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            {/* Personal Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
              <ComboboxInput
                label="Title"
                name="title"
                placeholder="Select Title"
                options={titles}
                register={register}
                errors={errors}
              />
              <TextInput
                label="First Name"
                name="firstName"
                placeholder="John"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                register={register}
                errors={errors}
              />
            </div>

            {/* Login Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <TextInput
                label="School Email"
                name="email"
                type="email"
                placeholder="teacher@school.com"
                register={register}
                errors={errors}
                toolTipText="Enter official school email address"
              />
              <PasswordInput
                label="Portal Password"
                name="password"
                type="password"
                placeholder="Enter a secure password"
                register={register}
                errors={errors}
                toolTipText="Password for teacher portal access"
              />
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <PhoneInput
                label="Mobile Number"
                name="phoneNumber"
                register={register}
                errors={errors}
              />
              <PhoneInput
                label="Emergency Contact"
                name="emergencyContact"
                register={register}
                errors={errors}
                toolTipText="Emergency contact number"
              />
            </div>

            {/* Professional Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <TextInput
                label="Employee ID"
                name="employeeId"
                placeholder="Enter Employee ID"
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Department"
                name="department"
                placeholder="Select Department"
                options={departments}
                register={register}
                errors={errors}
                href="/dashboard/academics/departments/create"
                toolTipText="Department where teacher works"
              />
            </div>

            {/* Academic Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
              <ComboboxInput
                label="Highest Education"
                name="educationLevel"
                placeholder="Select Education Level"
                options={educationLevels}
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Teaching Qualification"
                name="qualification"
                placeholder="Select Qualification"
                options={qualifications}
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Teaching Level"
                name="teachingLevel"
                placeholder="Select Teaching Level"
                options={teachingLevels}
                register={register}
                errors={errors}
              />
            </div>

            {/* Subject Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <ComboboxInput
                label="Main Subject"
                name="mainSubject"
                placeholder="Select Main Subject"
                showSearch="true"
                options={subjects}
                register={register}
                errors={errors}
                toolTipText="Add New Subject"
                href="/dashboard/academics/subjects/create"
              />
              <ComboboxInput
                label="Additional Subject"
                name="additionalSubject"
                placeholder="Select Additional Subject"
                showSearch="true"
                options={subjects}
                register={register}
                errors={errors}
                toolTipText="Add New Subject"
                href="/dashboard/academics/subjects/create"
              />
            </div>

            {/* Additional Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <ComboboxInput
                  label="Contract Type"
                  name="contractType"
                  placeholder="Select Contract Type"
                  options={contractTypes}
                  register={register}
                  errors={errors}
                />
                <ComboboxInput
                  label="Nationality"
                  name="nationality"
                  showSearch="true"
                  options={countries}
                  register={register}
                  errors={errors}
                />
                <TextArea
                  label="Address"
                  name="address"
                  placeholder="Enter full address"
                  rows="5"
                  register={register}
                  errors={errors}
                />
              </div>

              <ImageInput
                title="Teacher Photo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="teacherProfileImage"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/teachers"
        parent="academics"
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
