import { useState } from "react";
import { useForm } from "react-hook-form";
import { Globe, Mail, Send, User } from "lucide-react";

import TextInput from "@/components/FormInputs/TextInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { useNavigate } from "react-router-dom";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import { curriculums, schoolTypes } from "@/lib/formOption";

export default function SchoolDetailsForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      if (onSubmit) {
        await onSubmit(data);
      }
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 ">
        <TextInput
          icon={User}
          label="School Admin Name"
          register={register}
          name="adminName"
          type="text"
          errors={errors}
          placeholder="John Doe"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ComboboxInput
            label="School Type"
            name="schoolType"
            placeholder="Select school type"
            options={schoolTypes}
            register={register}
            errors={errors}
          />
          <ComboboxInput
            label="Curriculum"
            name="curriculum"
            placeholder="Select curriculum"
            options={curriculums}
            register={register}
            errors={errors}
          />
        </div>
        <TextInput
          icon={Mail}
          label="Contact Email"
          register={register}
          name="contactEmail"
          type="email"
          errors={errors}
          placeholder="contact@schoolname.com"
        />
        <PhoneInput
          register={register}
          errors={errors}
          name="phone"
          label="Contact Number"
          toolTipText="Please provide a valid school contact number"
        />
        <SubmitButton
          buttonIcon={Send}
          title="Create School Admin"
          loading={loading}
          loadingTitle="Creating school admin..."
        />
      </div>
    </form>
  );
}
