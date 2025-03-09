import { useState } from "react";
import { useForm } from "react-hook-form";
import { School, Send } from "lucide-react";

import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import ImageInput from "@/components/FormInputs/ImageInput";

export default function SchoolOnboardForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/Logo.png");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
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
          icon={School}
          label="School Name"
          register={register}
          name="schoolName"
          type="text"
          errors={errors}
          placeholder="School Sync"
        />

        <ImageInput
          title="School Logo"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="schoolLogo"
          className="object-contain"
        />
        <SubmitButton
          buttonIcon={Send}
          title="Register School"
          loading={loading}
          loadingTitle="Registering School..."
        />
      </div>
    </form>
  );
}
