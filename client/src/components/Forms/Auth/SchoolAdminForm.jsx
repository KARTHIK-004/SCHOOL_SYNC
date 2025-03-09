import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Mail, Send, User } from "lucide-react";

import TextInput from "@/components/FormInputs/TextInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { useNavigate } from "react-router-dom";

export default function SchoolAdminForm({ onSubmit }) {
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

      // Call the parent component's onSubmit function
      if (onSubmit) {
        await onSubmit(data);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 ">
        <TextInput
          icon={User}
          label="Admin Name"
          register={register}
          name="adminName"
          type="text"
          errors={errors}
          placeholder="John Doe"
        />
        <TextInput
          icon={Mail}
          label="Admin Email"
          register={register}
          name="adminEmail"
          type="email"
          errors={errors}
          placeholder="Eg. johndoe@gmail.com"
        />
        <PhoneInput
          register={register}
          errors={errors}
          name="adminPhone"
          label="Admin Number"
          toolTipText="Please provide a valid admin number"
        />
        <PasswordInput
          icon={Lock}
          label="Password"
          register={register}
          name="password"
          type="password"
          errors={errors}
          placeholder="******"
          forgotPasswordLink="/forgot-password"
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
