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
import {
  academicYears,
  courseTypeOptions,
  departmentCategories,
  hasLabs,
  offersCourses,
} from "@/lib/formOption";

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
          {/* Basic Information - Three columns */}
          <div className="grid sm:grid-cols-3 gap-4">
            <TextInput
              label="Subject Name"
              name="subjectName"
              placeholder="e.g. Mathematics"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Short Name"
              name="shortName"
              placeholder="e.g. Math"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Subject Code"
              name="subjectCode"
              placeholder="e.g. MATH01"
              register={register}
              errors={errors}
            />
          </div>

          {/* Additional Info - Two columns */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Passing Mark"
              name="passingMark"
              placeholder="e.g. 40"
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Academic Year"
              name="academicYear"
              options={academicYears}
              register={register}
              errors={errors}
            />
          </div>

          {/* Academic Details - Three columns */}
          <div className="grid sm:grid-cols-3 gap-4">
            <ComboboxInput
              label="Offers Courses"
              name="offersCourses"
              placeholder="Select yes or no"
              options={offersCourses}
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Has Labs"
              name="hasLabs"
              placeholder="Select yes or no"
              options={hasLabs}
              register={register}
              errors={errors}
            />

            <ComboboxInput
              label="Department"
              name="department"
              options={[
                { label: "Science", value: "science" },
                { label: "Arts", value: "arts" },
                { label: "Commerce", value: "commerce" },
              ]}
              showSearch={true}
              register={register}
              errors={errors}
              href="/dashboard/academics/departments"
              toolTipText="Create a new department"
            />
          </div>

          {/* Additional Flags - Two columns */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ComboboxInput
              label="Department Category"
              name="departmentCategory"
              options={departmentCategories}
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Course Type"
              name="courseType"
              placeholder="Select course type"
              options={courseTypeOptions}
              register={register}
              errors={errors}
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
