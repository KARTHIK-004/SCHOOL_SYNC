import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// API functions
import { createTimetable } from "@/utils/timetableAPI";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllClasses } from "@/utils/classAPI";
import { getSectionsByClass } from "@/utils/sectionAPI";
import { getAllSubjects } from "@/utils/subjectAPI";
import { getAllTeachers } from "@/utils/teacherAPI";
import { academicYears, durationOptions, timeOptions } from "@/lib/formOption";
import { getAllTerms } from "@/utils/termAPI";

export default function TimetableForm({ editingId, initialData }) {
  // Hooks
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // State for form options
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedClass, setSelectedClass] = useState(initialData?.class || "");
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Initialize timetable entries structured by days
  const [timetableEntries, setTimetableEntries] = useState({
    Monday: initialData?.Monday || [],
    Tuesday: initialData?.Tuesday || [],
    Wednesday: initialData?.Wednesday || [],
    Thursday: initialData?.Thursday || [],
    Friday: initialData?.Friday || [],
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      academicYear: initialData?.academicYear || "",
      term: initialData?.term || "",
      class: initialData?.class || "",
      section: initialData?.section || "",
      isActive: initialData?.isActive || true,
    },
  });

  // Watch for class changes
  const watchClass = watch("class");

  useEffect(() => {
    if (watchClass !== selectedClass) {
      setSelectedClass(watchClass);
    }
  }, [watchClass, selectedClass]);

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

        // Fetch Subjects
        const subjectResponse = await getAllSubjects(userData);
        const subjectsData = subjectResponse.data || [];
        const subjectOptions = subjectsData.map((subject) => ({
          value: subject._id,
          label: subject.subjectName,
        }));
        setSubjects(subjectOptions);

        // Fetch Teachers
        const teacherResponse = await getAllTeachers(userData);
        const teachersData = teacherResponse.data || [];
        const teacherOptions = teachersData.map((teacher) => ({
          value: teacher._id,
          label: `${teacher.firstName} ${teacher.lastName}`,
        }));
        setTeachers(teacherOptions);

        // Fetch Terms
        const termResponse = await getAllTerms(userData);
        const termsData = termResponse.data.data || [];
        const termOptions = termsData.map((term) => ({
          value: term._id,
          label: `${term.termName}`,
        }));
        setTerms(termOptions);

        // Set initial class ID if available in initialData
        if (initialData?.class) {
          setSelectedClass(initialData.class);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast({
          variant: "destructive",
          title: "Error fetching data",
          description: error.message || "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast, initialData]);

  // Fetch sections when class changes
  useEffect(() => {
    const fetchSections = async () => {
      if (!selectedClass) return;

      try {
        setLoading(true);
        const sectionResponse = await getSectionsByClass(selectedClass);
        const sectionsData = sectionResponse.data || [];
        const sectionOptions = sectionsData.map((section) => ({
          value: section._id,
          label: section.sectionName,
        }));
        setSections(sectionOptions);

        setValue("section", "");
      } catch (error) {
        console.error("Error fetching sections:", error);
        toast({
          variant: "destructive",
          title: "Error fetching sections",
          description: error.message || "Please try again later.",
        });
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedClass) {
      fetchSections();
    }
  }, [selectedClass, toast, setValue]);

  const addNewEntry = () => {
    const newEntry = {
      id: Date.now(),
      subject: "",
      teacher: "",
      timeFrom: null,
      timeTo: null,
    };

    setTimetableEntries({
      ...timetableEntries,
      [selectedDay]: [...timetableEntries[selectedDay], newEntry],
    });
  };

  // Remove an entry from a specific day
  const removeEntry = (day, entryId) => {
    setTimetableEntries({
      ...timetableEntries,
      [day]: timetableEntries[day].filter((entry) => entry.id !== entryId),
    });
  };

  // Handle day selection
  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  async function onSubmit(data) {
    try {
      setLoading(true);

      const timetableData = {
        ...data,
        ...timetableEntries,
      };

      if (editingId) {
        // await updateTimetable(editingId, timetableData);
        toast({
          title: "Success",
          description: "Timetable updated successfully!",
          variant: "success",
        });
      } else {
        await createTimetable(timetableData);
        toast({
          title: "Success",
          description: "Timetable created successfully!",
          variant: "success",
        });
      }
      reset();
      setTimetableEntries({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          error.response?.data.message || "Failed to save timetable!",
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
        href="/timetables"
        parent=""
        title="Timetable"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            {/* Timetable Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="Timetable Title"
                name="title"
                placeholder="Class 5A Weekly Schedule"
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Academic Year"
                name="academicYear"
                placeholder="2025-2026"
                options={academicYears}
                register={register}
                errors={errors}
                showSearch={true}
              />
            </div>

            {/* Term and Duration */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ComboboxInput
                label="Term/Semester"
                name="termId"
                placeholder="Term 1"
                options={terms}
                register={register}
                errors={errors}
                showSearch={true}
                href="/dashboard/academics/terms/create"
                toolTipText="Add new Terms"
              />
              <ComboboxInput
                label="Duration"
                name="duration"
                options={durationOptions}
                register={register}
                errors={errors}
                placeholder="Select"
              />
            </div>

            {/* Class Information */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <ComboboxInput
                label="Class"
                name="classId"
                placeholder="Select Class"
                options={classes}
                register={register}
                errors={errors}
                showSearch={true}
                href="/dashboard/academics/classes/create"
                toolTipText="Add new Class"
              />
              <ComboboxInput
                label="Section"
                name="sectionId"
                placeholder="Select Section"
                options={sections}
                register={register}
                errors={errors}
                href="dashboard/academics/classes/sections/create"
                toolTipText="Add new Sections"
              />
            </div>

            {/* Day Selection */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Select Day</h3>
              <div className="flex flex-wrap gap-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (day) => (
                    <div key={day} className="flex items-center">
                      <input
                        type="radio"
                        id={`day-${day}`}
                        name="selectedDay"
                        className="hidden"
                        checked={selectedDay === day}
                        onChange={() => handleDaySelection(day)}
                      />
                      <label
                        htmlFor={`day-${day}`}
                        className={`px-4 py-2 rounded-md cursor-pointer ${
                          selectedDay === day
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        onClick={() => handleDaySelection(day)}
                      >
                        {day}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Timetable Entries */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{selectedDay} Classes</h3>
                <Button type="button" onClick={addNewEntry}>
                  Add New
                </Button>
              </div>

              {timetableEntries[selectedDay].length === 0 ? (
                <div className="text-center py-8 border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">
                    No classes added for {selectedDay}. Click "Add New" to
                    create your first class.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {timetableEntries[selectedDay].map((entry, index) => (
                    <Card key={entry.id} className="p-4 border">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Class #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEntry(selectedDay, entry.id)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ComboboxInput
                          label="Subject"
                          name="subjectId"
                          register={register}
                          errors={errors}
                          options={subjects}
                          placeholder="Select Subject"
                          showSearch={true}
                        />

                        <ComboboxInput
                          label="Teacher"
                          name="teacherId"
                          register={register}
                          options={teachers}
                          placeholder="Select Teacher"
                          showSearch={true}
                        />
                        <ComboboxInput
                          label="From"
                          name="fromTime"
                          options={timeOptions}
                          register={register}
                          errors={errors}
                          placeholder="Select time"
                        />
                        <ComboboxInput
                          label="To"
                          name="toTime"
                          options={timeOptions}
                          register={register}
                          errors={errors}
                          placeholder="Select time"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Footer */}
      <FormFooter
        href="/timetables"
        parent=""
        title="Timetable"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
