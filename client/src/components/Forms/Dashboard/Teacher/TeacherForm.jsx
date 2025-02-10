import { useState } from "react";
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
  subjects,
  departments,
  countries,
  educationLevels,
  qualifications,
  teachingLevels,
  contractTypes,
} from "@/lib/formOption";

export default function TeacherForm({ editingId, initialData }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/parent.png"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: initialData?.firstname || "",
      lastname: initialData?.lastname || "",
    },
  });

  async function onSubmit(data) {
    try {
      setLoading(true);
      if (editingId) {
        setLoading(false);
        toast({
          title: "Success",
          description: "Teacher updated successfully!",
          variant: "success",
        });
      } else {
        setLoading(false);
        toast({
          title: "Success",
          description: "Teacher created successfully!",
          variant: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/teachers"
        parent=""
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            {/* Personal Information */}
            <div className="grid sm:grid-cols-3 gap-4">
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
                name="firstname"
                placeholder="John"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Last Name"
                name="lastname"
                placeholder="Doe"
                register={register}
                errors={errors}
              />
            </div>

            {/* Login Information */}
            <div className="grid sm:grid-cols-2 gap-4">
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

            {/* Professional Information */}
            <div className="grid sm:grid-cols-3 gap-4">
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
              />
              <ComboboxInput
                label="Contract Type"
                name="contractType"
                placeholder="Select Contract Type"
                options={contractTypes}
                register={register}
                errors={errors}
              />
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4">
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

            {/* Academic Information */}
            <div className="grid sm:grid-cols-3 gap-4">
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

            {/* Additional Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <ComboboxInput
                  label="Subject Specialization"
                  name="subjects"
                  placeholder="Select Subjects"
                  options={subjects}
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
        parent=""
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
