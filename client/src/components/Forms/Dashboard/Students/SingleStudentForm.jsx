import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TextInput from "@/components/FormInputs/TextInput";
import DateInput from "@/components/FormInputs/DateInput";
import {
  bloodGroups,
  classes,
  countries,
  genders,
  parents,
  religions,
  sections,
  titles,
} from "@/lib/formOption";
import ComboboxInput from "@/components/FormInputs/ComboboxInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import PhoneInput from "@/components/FormInputs/PhoneInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { User } from "lucide-react";

export default function SingleStudent({ editingId, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // firstname: initialData?.firstname || "",
      // lastname: initialData?.lastname || "",
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function onSubmit(data) {
    try {
      setLoading(true);

      if (editingId) {
        // await updateCategoryById(editingId, data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Student created successfully!",
          variant: "success",
        });

        // reset();
        // navigate("/dashboard/students");
        // setImageUrl("/placeholder.svg");
      } else {
        // await createCategory(data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Student updated successfully!",
          variant: "success",
        });
        // reset();
        // navigate("/dashboard/students");
        // setImageUrl("/placeholder.svg");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    console.log(data);
  }

  const options = [
    {
      label: "A+",
      value: "A+",
    },
    {
      label: "B+",
      value: "B+",
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />
      {/* <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              
              <TextInput
                label="First Name"
                name="firstname"
                placeholder="John"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Last Name"
                name="lastname"
                placeholder="Doe"
                register={register}
                errors={errors}
              />
            </div>
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
                name="birthcertificateno"
                placeholder="Enter Birth Certificate Number"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Register No"
                name="regno"
                placeholder="Enter Register Number"
                register={register}
                errors={errors}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <ComboboxInput
                label="Class"
                name="class"
                showSearch
                options={classes}
                register={register}
                errors={errors}
                toolTipText="Add New Class"
                href="/dashboard/academics/classes"
              />
              <ComboboxInput
                label="Section"
                name="section"
                showSearch
                options={sections}
                register={register}
                errors={errors}
                toolTipText="Add New Stream"
                href="/dashboard/academics/classes"
              />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <ComboboxInput
                label="Parent Name"
                name="parent"
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

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <TextInput
                label="State/Village"
                name="state"
                placeholder="Enter state or village"
                register={register}
                errors={errors}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextArea
                label="Address"
                name="address"
                placeholder="Enter full address"
                register={register}
                errors={errors}
              />
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
      </div> */}
      <FormSelectInput
        label="Title"
        name="title"
        register={register}
        errors={errors}
        options={options}
        option={selectedTitle}
        setOption={setSelectedTitle}
        toolTipText="Please select your title"
      />
      <ComboboxInput
        showSearch
        label="Blood Group"
        name="bloodGroup"
        placeholder="Select Blood Group"
        options={bloodGroups}
        register={register}
        errors={errors}
      />
      <TextInput
        label="First Name"
        name="firstname"
        placeholder="John"
        register={register}
        errors={errors}
      />

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
