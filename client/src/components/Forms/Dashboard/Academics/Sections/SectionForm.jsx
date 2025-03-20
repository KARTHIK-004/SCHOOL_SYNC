import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../../FormHeader";
import FormFooter from "../../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import TextArea from "@/components/FormInputs/TextAreaInput";

import { getAllClasses } from "@/utils/classAPI";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllTeachers } from "@/utils/teacherAPI";
import { createSection } from "@/utils/sectionAPI";

export function SectionForm({ editingId, initialData }) {
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sectionName: initialData?.sectionName || "",
      sectionCode: initialData?.sectionCode || "",
      classId: initialData?.classId || "",
      teacherId: initialData?.teacherId || "",
      roomNumber: initialData?.roomNumber || "",
      capacity: initialData?.capacity || "",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        // Fetch Classes
        const classResponse = await getAllClasses(userData);
        const classesData = classResponse.data || [];
        const classOptions = classesData.map((classItem) => ({
          value: classItem._id,
          label: classItem.className,
        }));
        setClasses(classOptions);

        // Fetch Teachers
        const teacherResponse = await getAllTeachers(userData);
        const teachersData = teacherResponse.data || [];
        const teacherOptions = teachersData.map((teacher) => ({
          value: teacher._id,
          label: `${teacher.firstName} ${teacher.lastName}`,
        }));
        setTeachers(teacherOptions);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast({
          variant: "destructive",
          title: "Error fetching classes",
          description: error.message || "Please try again later.",
        });
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

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
        await createSection(data);
        toast({
          title: "Success",
          description: "Section created successfully!",
          variant: "success",
        });
      }
      // navigate("/dashboard/academics/classes");
      // reset();
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
              placeholder="Select Class"
              showSearch={true}
              options={classes}
              register={register}
              errors={errors}
              toolTipText="Add New Class"
              href="/dashboard/academics/classes/create"
            />
            <ComboboxInput
              label="Class Teacher"
              name="teacherId"
              placeholder="Select Teacher"
              showSearch={true}
              options={teachers}
              register={register}
              errors={errors}
              toolTipText="Add New Teacher"
              href="/dashboard/teachers/create"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <TextInput
                label="Room Number"
                name="roomNumber"
                placeholder="e.g. 101"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Capacity"
                name="capacity"
                placeholder="eg. 30"
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
              rows={5}
            />
          </div>
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
