import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

// Form Components
import FormHeader from "@/components/Forms/Dashboard/FormHeader";
import FormFooter from "@/components/Forms/Dashboard/FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import DateInput from "@/components/FormInputs/DateInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
// import SelectInput from "@/components/FormInputs/SelectInput";

export default function CreateAssignment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Dummy sections data
  const sections = [
    { value: "1", name: "Mathematics - Grade 10" },
    { value: "2", name: "Science - Grade 9" },
    { value: "3", name: "English - Grade 11" },
  ];

  async function onSubmit(data) {
    try {
      setLoading(true);
      // await createAssignment(data);
      toast({
        title: "Success",
        description: "Assignment created successfully!",
        variant: "success",
      });
      navigate("/dashboard/teacher/assignments");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create assignment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          title="Create Assignment"
          href="/teacher/assignments"
          parent=""
          loading={loading}
        />

        <div className="grid grid-cols-12 gap-6 py-8 px-4 md:px-8">
          <div className="lg:col-span-12 col-span-full space-y-6">
            {/* Basic Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="Assignment Title"
                name="title"
                placeholder="e.g. Algebra Homework"
                register={register}
                errors={errors}
                required
              />
              <ComboboxInput
                label="Class Section"
                name="sectionId"
                options={sections}
                register={register}
                errors={errors}
              />
            </div>

            {/* Due Date and Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              <DateInput
                label="Due Date"
                name="dueDate"
                register={register}
                errors={errors}
                required
              />
              <TextInput
                label="Total Points"
                name="points"
                type="number"
                placeholder="100"
                register={register}
                errors={errors}
                required
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 gap-4">
              <TextareaInput
                label="Instructions"
                name="instructions"
                placeholder="Enter assignment instructions"
                register={register}
                errors={errors}
                className="sm:col-span-2"
                rows={6}
              />
            </div>
          </div>
        </div>

        <FormFooter
          href="/teacher/assignments"
          parent=""
          title="Assignment"
          loading={loading}
        />
      </form>
    </ScrollArea>
  );
}
