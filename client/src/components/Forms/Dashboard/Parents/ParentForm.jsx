import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { createParent, updateParent } from "@/utils/parentAPI";

// Form Options
import {
  titles,
  occupations,
  relationships,
  countries,
  religions,
  educationLevels,
  incomeRanges,
  contactMethods,
} from "@/lib/formOption";

export default function ParentForm({ editingId, initialData }) {
  // Hooks
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
      title: initialData?.title || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      relationship: initialData?.relationship || "",
      nationalId: initialData?.nationalId || "",
      contactMethod: initialData?.contactMethod || "",
      phone: initialData?.phone || "",
      whatsapp: initialData?.whatsapp || "",
      educationLevel: initialData?.educationLevel || "",
      occupation: initialData?.occupation || "",
      incomeRange: initialData?.incomeRange || "",
      religion: initialData?.religion || "",
      nationality: initialData?.nationality || "",
      address: initialData?.address || "",
    },
  });

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      const parentData = {
        ...data,
        imageUrl: imageUrl || "/parent.png",
      };

      if (editingId) {
        await updateParent(editingId, parentData);
        toast({
          title: "Success",
          description: "Parent/Guardian updated successfully!",
          variant: "success",
        });
      } else {
        await createParent(parentData);
        toast({
          title: "Success",
          description: "Parent/Guardian created successfully!",
          variant: "success",
        });
      }
      reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          error.response?.data.message || "Failed to create Parent/Guardian!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form Header */}
      <FormHeader
        href="/parents"
        parent=""
        title="Parent"
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
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="Parent Portal Email"
                name="email"
                type="email"
                placeholder="Parent@example.com"
                register={register}
                errors={errors}
                toolTipText="Enter the email address used for parent portal access."
              />
              <PasswordInput
                label="Parent Portal Password"
                name="password"
                type="password"
                placeholder="Enter a secure password"
                register={register}
                errors={errors}
                toolTipText="This password will be used to log in to the parent portal."
              />
            </div>

            {/* Relationship Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
              <ComboboxInput
                label="Relationship to Student"
                name="relationship"
                placeholder="Select Relationship"
                showSearch="true"
                options={relationships}
                register={register}
                errors={errors}
                toolTipText="Select the parent's or guardian's relationship to the student."
              />
              <TextInput
                label="National ID"
                name="nationalId"
                placeholder="Enter National ID Number"
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Preferred Contact"
                name="contactMethod"
                placeholder="Select Contact Method"
                options={contactMethods}
                register={register}
                errors={errors}
              />
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <PhoneInput
                label="Parent Mobile Number"
                name="phone"
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

            {/* Additional Information */}
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

              {/* Parent Photo */}
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

      {/* Form Footer */}
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
