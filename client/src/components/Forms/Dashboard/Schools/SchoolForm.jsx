import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import { countries, schoolTypes, curriculums } from "@/lib/formOption";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";

export default function SchoolForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/school-logo.png");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      await onSubmit({ ...data, logo: imageUrl });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TextInput
            label="School Name"
            name="name"
            placeholder="Enter school name"
            register={register}
            errors={errors}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <ComboboxInput
              label="School Type"
              name="type"
              options={schoolTypes}
              register={register}
              errors={errors}
              required
            />
            <ComboboxInput
              label="Curriculum"
              name="curriculum"
              options={curriculums}
              register={register}
              errors={errors}
              required
            />
          </div>

          <TextInput
            label="Website"
            name="website"
            placeholder="www.yourschool.com"
            register={register}
            errors={errors}
          />

          <PhoneInput
            label="Contact Number"
            name="phone"
            register={register}
            errors={errors}
            required
          />
        </div>

        <ImageInput
          title="School Logo"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="schoolLogo"
          className="h-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="school@example.com"
          register={register}
          errors={errors}
          required
        />
        <ComboboxInput
          label="Country"
          name="country"
          options={countries}
          register={register}
          errors={errors}
          required
          showSearch
        />
      </div>

      <TextArea
        label="Address"
        name="address"
        placeholder="Enter school address"
        register={register}
        errors={errors}
        required
      />

      <TextArea
        label="Description"
        name="description"
        placeholder="Brief description about your school"
        register={register}
        errors={errors}
      />

      <SubmitButton
        buttonIcon={Send}
        title="Register School"
        loading={loading}
        loadingTitle="Registering..."
      />
    </form>
  );
}
