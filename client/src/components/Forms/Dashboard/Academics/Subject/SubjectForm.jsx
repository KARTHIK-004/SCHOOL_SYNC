import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../../FormHeader";
import FormFooter from "../../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";

// Form Options
import { academicYears } from "@/lib/formOption";

// Subject Form Component
export function SubjectForm({ editingId, initialData }) {
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
      subjectName: initialData?.subjectName || "",
      subjectCode: initialData?.subjectCode || "",
      description: initialData?.description || "",
    },
  });

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateSubject(editingId, data);
        toast({
          title: "Success",
          description: "Subject updated successfully!",
          variant: "success",
        });
      } else {
        // await createSubject(data);
        toast({
          title: "Success",
          description: "Subject created successfully!",
          variant: "success",
        });
      }
      navigate("/dashboard/academics/subjects");
    } catch (error) {
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
        href="/subjects"
        parent="academics"
        title="Subject"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          {/* Basic Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Subject Name"
              name="subjectName"
              placeholder="e.g. Mathematics"
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Subject Code"
              name="subjectCode"
              placeholder="e.g. MATH01"
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Academic Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ComboboxInput
              label="Academic Year"
              name="academicYear"
              options={academicYears}
              register={register}
              errors={errors}
              required
            />
            <ComboboxInput
              label="Department"
              name="department"
              options={[
                { label: "Science", value: "science" },
                { label: "Arts", value: "arts" },
                { label: "Commerce", value: "commerce" },
              ]}
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Additional Information */}
          <div className="grid sm:grid-cols-1 gap-4">
            <TextInput
              label="Description"
              name="description"
              placeholder="Enter subject description"
              register={register}
              errors={errors}
              multiline
              rows={4}
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/subjects"
        parent="academics"
        title="Subject"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
