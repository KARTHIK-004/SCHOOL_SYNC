import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import DateInput from "@/components/FormInputs/DateInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";

// Event Form Component
export function EventForm({ editingId, initialData }) {
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
      eventTitle: initialData?.eventTitle || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
    },
  });

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateEvent(editingId, data);
        toast({
          title: "Success",
          description: "Event updated successfully!",
          variant: "success",
        });
      } else {
        // await createEvent(data);
        toast({
          title: "Success",
          description: "Event created successfully!",
          variant: "success",
        });
      }
      navigate("/dashboard/events");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={editingId ? "Edit Event" : "Create Event"}
        href="/events"
        parent=""
        editingId={editingId}
        loading={loading}
      />
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          {/* Basic Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="Event Title"
              name="eventTitle"
              placeholder="e.g. Annual Sports Day"
              register={register}
              errors={errors}
              required
            />
            <TextInput
              label="Location"
              name="location"
              placeholder="e.g. School Auditorium"
              register={register}
              errors={errors}
              required
            />
          </div>

          {/* Date and Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            <DateInput
              label="Start Date & Time"
              name="startDate"
              register={register}
              errors={errors}
              required
            />
            <DateInput
              label="End Date & Time"
              name="endDate"
              register={register}
              errors={errors}
            />
          </div>

          {/* Description and Status */}
          <div className="grid grid-cols-1 gap-4">
            <TextareaInput
              label="Description"
              name="description"
              placeholder="Enter event details"
              register={register}
              errors={errors}
              className="sm:col-span-2"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/events"
        parent=""
        title="Event"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
