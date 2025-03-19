import { useEffect, useState } from "react";
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
import { createClass } from "@/utils/classAPI";
import { getAllDepartments } from "@/utils/departmentAPI";
import { getCurrentUser } from "@/utils/authAPI";

// Class Form Component
export function ClassForm({ editingId, initialData }) {
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      className: initialData?.className || "",
      classCode: initialData?.classCode || "",
      academicYear: initialData?.academicYear || "",
      department: initialData?.department || "",
    },
  });

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllDepartments(userData);
        const departments = response.data.data;

        const departmentOptions = departments.map((department) => ({
          value: department._id,
          label: department.departmentName,
        }));

        setDepartments(departmentOptions);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast({
          variant: "destructive",
          title: "Error fetching departments",
          description: error.message || "Please try again later.",
        });
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [toast]);

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateClass(editingId, data);
        toast({
          title: "Success",
          description: "Class updated successfully!",
          variant: "success",
        });
      } else {
        await createClass(data);
        toast({
          title: "Success",
          description: "Class created successfully!",
          variant: "success",
        });
      }
      // navigate("/dashboard/academics/classes");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save class",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/classes"
        parent="academics"
        title="Class"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          {/* Basic Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Class Name"
              name="className"
              placeholder="e.g. Class 8"
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Class Code"
              name="classCode"
              placeholder="e.g. C8"
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
              placeholder="Select Academic Year"
              options={academicYears}
              register={register}
              errors={errors}
            />
            <ComboboxInput
              label="Department"
              name="department"
              placeholder="Select Department"
              options={departments}
              register={register}
              errors={errors}
              href="/dashboard/academics/departments/create"
              toolTipText="Add a new department"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/classes"
        parent="academics"
        title="Class"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
