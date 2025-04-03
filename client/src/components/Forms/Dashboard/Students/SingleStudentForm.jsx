import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Component Imports
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import DateInput from "@/components/FormInputs/DateInput";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";

// Form Options
import { bloodGroups, countries, genders, religions } from "@/lib/formOption";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllClasses } from "@/utils/classAPI";
import { getSectionsByClass } from "@/utils/sectionAPI";
import { getAllParents } from "@/utils/parentAPI";
import { createStudent } from "@/utils/studentAPI";

export default function SingleStudent({ editingId, initialData }) {
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/student.png"
  );
  const [selectedClassId, setSelectedClassId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      classId: initialData?.class || "",
      sectionId: initialData?.section || "",
      parentId: initialData?.parent || "",
    },
  });

  // Watch for changes to the class field
  const selectedClass = watch("classId");

  // Fetch initial data (classes and parents)
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

        // Fetch Parents
        const parentResponse = await getAllParents(userData);
        const parentsData = parentResponse.data || [];
        const parentOptions = parentsData.map((parent) => ({
          value: parent._id,
          label: `${parent.firstName} ${parent.lastName}`,
        }));
        setParents(parentOptions);

        // Set initial class ID if available in initialData
        if (initialData?.class) {
          setSelectedClassId(initialData.class);
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

        setValue("sectionId", "");
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

  // Form submission handler
  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateStudent(editingId, data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Student updated successfully!",
          variant: "success",
        });
      } else {
        await createStudent(data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Student created successfully!",
          variant: "success",
        });
      }
      // navigate("/dashboard/students");
      // reset
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            {/* Personal Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                name="firstName"
                placeholder="John"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                register={register}
                errors={errors}
              />
            </div>

            {/* Basic Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <DateInput
                label="Date of Birth"
                name="birthDate"
                placeholder="YYYY-MM-DD"
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Gender"
                name="gender"
                placeholder="Select Gender"
                options={genders}
                register={register}
                errors={errors}
              />
              <ComboboxInput
                label="Blood Group"
                name="bloodGroup"
                placeholder="Select Blood Group"
                options={bloodGroups}
                register={register}
                errors={errors}
              />
            </div>

            {/* Account Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="example@email.com"
                register={register}
                errors={errors}
              />
              <PasswordInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                register={register}
                errors={errors}
              />
            </div>

            {/* Admission Details */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <DateInput
                label="Admission Date"
                name="admissionDate"
                placeholder="YYYY-MM-DD"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Birth Certificate No"
                name="birthCertificateNo"
                placeholder="Enter Birth Certificate Number"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Register No"
                name="regNo"
                placeholder="Enter Register Number"
                register={register}
                errors={errors}
              />
            </div>

            {/* Academic Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Controller
                name="classId"
                control={control}
                render={({ field }) => (
                  <ComboboxInput
                    label="Class"
                    name="classId"
                    showSearch
                    options={classes}
                    register={register}
                    errors={errors}
                    toolTipText="Add New Class"
                    href="/dashboard/academics/classes"
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                )}
              />
              <ComboboxInput
                label="Section"
                name="sectionId"
                showSearch
                options={sections}
                register={register}
                errors={errors}
                toolTipText="Add New Stream"
                href="/dashboard/academics/classes"
              />
            </div>

            {/* Guardian Information */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <ComboboxInput
                label="Parent Name"
                name="parentId"
                placeholder="Select a parent"
                showSearch
                options={parents}
                register={register}
                errors={errors}
                toolTipText="Add New Parent/Guardian"
                href="/dashboard/parents/create"
              />
              <PhoneInput
                label="Phone Number"
                name="phone"
                register={register}
                errors={errors}
                toolTipText="Please enter your contact number"
              />
            </div>

            {/* Additional Information and Photo */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <ComboboxInput
                  label="Religion"
                  name="religion"
                  placeholder="Select Religion"
                  options={religions}
                  register={register}
                  errors={errors}
                />
                <ComboboxInput
                  label="Nationality"
                  name="nationality"
                  options={countries}
                  register={register}
                  errors={errors}
                />
                <TextArea
                  label="Address"
                  name="address"
                  placeholder="Enter full address"
                  rows="5"
                  register={register}
                  errors={errors}
                />
              </div>

              <ImageInput
                title="Student Profile Photo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="studentProfileImage"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
