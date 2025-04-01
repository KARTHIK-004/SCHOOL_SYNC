import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// API Imports
import { getCurrentUser } from "@/utils/authAPI";
// import { createTerm } from "@/utils/termAPI";

// Component Imports
import FormHeader from "../../FormHeader";
import FormFooter from "../../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import DateInput from "@/components/FormInputs/DateInput";
import { academicYears } from "@/lib/formOption";

// Form Options
import { termTypes, termStatus, isActive } from "@/lib/formOption";
import TextArea from "@/components/FormInputs/TextAreaInput";

// Term Form Component
export function TermForm({ editingId, initialData }) {
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      termName: initialData?.termName || "",
      termCode: initialData?.termCode || "",
      shortName: initialData?.shortName || "",
      academicYear: initialData?.academicYear?._id || "",
      termType: initialData?.termType || "",
      termOrder: initialData?.termOrder || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate)
        : null,
      endDate: initialData?.endDate ? new Date(initialData.endDate) : null,
      status: initialData?.status || "",
      isActive: initialData?.isActive || "",
      description: initialData?.description || "",
    },
  });

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateTerm(editingId, data);
        toast({
          title: "Success",
          description: "Term updated successfully!",
          variant: "success",
        });
      } else {
        // await createTerm(data);
        toast({
          title: "Success",
          description: "Term created successfully!",
          variant: "success",
        });
      }
      // navigate("/dashboard/academics/terms");
      // reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save term",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/terms"
        parent="academics"
        title="Term"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-4">
          {/* Basic Information Section */}
          <div className="grid sm:grid-cols-3 gap-4">
            <TextInput
              label="Term Name"
              name="termName"
              placeholder="e.g. Fall Term 2025"
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Short Name"
              name="shortName"
              placeholder="e.g. Fall 25"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Term Code"
              name="termCode"
              placeholder="e.g. TERM25F"
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Term Details Section */}
          <div className="grid sm:grid-cols-3 gap-4">
            <ComboboxInput
              label="Academic Year"
              name="academicYear"
              options={academicYears}
              showSearch={true}
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Term Type"
              name="termType"
              options={termTypes}
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Term Order"
              name="termOrder"
              placeholder="e.g. 1"
              register={register}
              errors={errors}
              type="number"
            />
          </div>

          {/* Date Section */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DateInput
              label="Start Date"
              name="startDate"
              register={register}
              errors={errors}
            />
            <DateInput
              label="End Date"
              name="endDate"
              register={register}
              errors={errors}
            />
          </div>

          {/* Status and Description Section */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <ComboboxInput
                label="Status"
                name="status"
                options={termStatus}
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Is Active"
                name="isActive"
                options={isActive}
                register={register}
                errors={errors}
              />
            </div>
            <div className="grid sm:grid-cols-1 gap-4">
              <TextArea
                label="Description"
                name="description"
                placeholder="Term description..."
                register={register}
                errors={errors}
                rows={6}
              />
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/terms"
        parent="academics"
        title="Term"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
