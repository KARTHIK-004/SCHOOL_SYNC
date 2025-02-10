import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";

// Form Options
import {
  titles,
  occupations,
  relationships,
  countries,
  religions,
  educationLevels,
  incomeRanges,
} from "@/lib/formOption";

export default function ParentForm({ editingId, initialData }) {
  // Hooks
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

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateParentById(editingId, data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Parent/Guardian updated successfully!",
          variant: "success",
        });
      } else {
        // await createParent(data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Parent/Guardian created successfully!",
          variant: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/parents"
        parent=""
        title="Parent/Guardian"
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
                label="Email"
                name="email"
                type="email"
                placeholder="example@email.com"
                register={register}
                errors={errors}
              />
              <PasswordInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                register={register}
                errors={errors}
              />
            </div>

            {/* Professional Information */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <ComboboxInput
                label="Education Level"
                name="educationLevel"
                placeholder="Select Education Level"
                options={educationLevels}
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Occupation"
                name="occupation"
                placeholder="Select Occupation"
                showSearch="true"
                options={occupations}
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Income Range"
                name="incomeRange"
                placeholder="Select Income Range"
                options={incomeRanges}
                register={register}
                errors={errors}
              />
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <PhoneInput
                label="Phone"
                name="phoneNumber"
                register={register}
                errors={errors}
              />
              <PhoneInput
                label="WhatsApp Phone"
                name="whatsapp"
                register={register}
                errors={errors}
                toolTipText="Please enter WhatsApp number"
              />
            </div>

            {/* Relationship Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ComboboxInput
                label="Relationship to Student"
                name="relationship"
                placeholder="Select Relationship"
                options={relationships}
                register={register}
                errors={errors}
              />
              <TextInput
                label="National ID"
                name="nationalId"
                placeholder="Enter National ID Number"
                register={register}
                errors={errors}
              />
            </div>

            {/* Additional Information and Photo */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <ComboboxInput
                  label="Religion"
                  name="religion"
                  placeholder="Select Religion"
                  options={religions}
                  register={register}
                  errors={errors}
                />
                <ComboboxInput
                  label="Nationality"
                  name="nationality"
                  options={countries}
                  register={register}
                  errors={errors}
                />
                <TextArea
                  label="Address"
                  name="address"
                  placeholder="Enter full address"
<<<<<<< HEAD
                  rows="5"
=======
>>>>>>> a1d8ad91df15095a531d4be4459849b98dc5903d
                  register={register}
                  errors={errors}
                />
              </div>

              <ImageInput
                title="Parent/Guardian Photo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="parentProfileImage"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/parents"
        parent=""
        title="Parent/Guardian"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
