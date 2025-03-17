import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../../FormHeader";
import FormFooter from "../../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import TextArea from "@/components/FormInputs/TextAreaInput";

// Form Options
import { academicYears } from "@/lib/formOption";

export function SectionForm({ editingId, initialData }) {
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sectionName: initialData?.sectionName || "",
      sectionCode: initialData?.sectionCode || "",
      description: initialData?.description || "",
    },
  });

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateSection(editingId, data);
        toast({
          title: "Success",
          description: "Section updated successfully!",
          variant: "success",
        });
      } else {
        // await createSection(data);
        toast({
          title: "Success",
          description: "Section created successfully!",
          variant: "success",
        });
      }
      navigate("/dashboard/academics/sections");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save section",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/dashboard/academics/sections"
        parent="Academics"
        title="Section"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          {/* Basic Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Section Name"
              name="sectionName"
              placeholder="e.g. Section A"
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Section Code"
              name="sectionCode"
              placeholder="e.g. SEC-A"
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Class Assignment */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ComboboxInput
              label="Associated Class"
              name="classId"
              options={[]} // This would be populated from your API
              register={register}
              errors={errors}
              required
              toolTipText="Add New Class"
              href="/dashboard/academics/classes/create"
            />
            <TextInput
              label="Capacity"
              name="capacity"
              placeholder="Enter section capacity"
              register={register}
              errors={errors}
            />
          </div>

          {/* Teacher Assignment */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ComboboxInput
              label="Class Teacher"
              name="teacherId"
              options={[]} // This would be populated from your API
              register={register}
              errors={errors}
              toolTipText="Add New Teacher"
              href="/dashboard/staff/create"
            />
            <ComboboxInput
              label="Academic Year"
              name="academicYear"
              options={academicYears}
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Schedule */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Room Number"
              name="roomNumber"
              placeholder="e.g. 101"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Time Slot"
              name="timeSlot"
              placeholder="e.g. 9:00 AM - 3:00 PM"
              register={register}
              errors={errors}
            />
          </div>

          {/* Description */}
          <TextArea
            label="Description"
            name="description"
            placeholder="Enter section description"
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <FormFooter
        href="/dashboard/academics/sections"
        parent="Academics"
        title="Section"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
