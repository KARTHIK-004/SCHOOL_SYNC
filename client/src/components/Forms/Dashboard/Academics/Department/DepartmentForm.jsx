import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../../FormHeader";
import FormFooter from "../../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import {
  departmentCategories,
  departmentTypes,
  facultyOptions,
  hasLabs,
  offersCourses,
  statuses,
} from "@/lib/formOption";
import TextArea from "@/components/FormInputs/TextAreaInput";
import { createDepartment } from "@/utils/departmentAPI";

// Department Form Component
export function DepartmentForm({ editingId, initialData }) {
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
      departmentName: initialData?.departmentName || "",
      departmentCode: initialData?.departmentCode || "",
      departmentCategory: initialData?.departmentCategory || "",
      departmentType: initialData?.departmentType || "",
      departmentFaculty: initialData?.departmentFaculty || "",
      status: initialData?.status || "",
      offersCourses: initialData?.offersCourses || "",
      hasLabs: initialData?.hasLabs || "",
      description: initialData?.description || "",
    },
  });

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateDepartment(editingId, data);
        toast({
          title: "Success",
          description: "Department updated successfully!",
          variant: "success",
        });
      } else {
        await createDepartment(data);
        toast({
          title: "Success",
          description: "Department created successfully!",
          variant: "success",
        });
      }
      navigate("/dashboard/academics/departments");
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save department",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/departments"
        parent="academics"
        title="Department"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          {/* Basic Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Department Name"
              name="departmentName"
              placeholder="e.g. Science Department"
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Department Code"
              name="departmentCode"
              placeholder="e.g. SCI-DEPT"
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Department Details */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            <ComboboxInput
              label="Department Category"
              name="departmentCategory"
              placeholder="Select department category"
              options={departmentCategories}
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Department Type"
              name="departmentType"
              placeholder="Select department type"
              showSearch={true}
              options={departmentTypes}
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Department Faculty"
              name="departmentFaculty"
              placeholder="Select department faculty"
              showSearch={true}
              options={facultyOptions}
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 pt-1">
              <ComboboxInput
                label="Department Status"
                name="status"
                placeholder="Select department status"
                options={statuses}
                register={register}
                errors={errors}
              />
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
            <TextArea
              label="Description"
              name="description"
              placeholder="Enter department description"
              register={register}
              errors={errors}
              rows={5}
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/departments"
        parent="academics"
        title="Department"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
