import { useForm } from "react-hook-form";
import { useState } from "react";
import CustomCarousel from "@/components/ui/custom-carousel";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/ui/logo";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock, UserPlus, Mail, User } from "lucide-react";
import { signUp } from "@/utils/authAPI";
import { useToast } from "@/hooks/use-toast";
import RadioInput from "@/components/FormInputs/RadioInput";
import ComboboxInput from "@/components/FormInputs/ComboBoxInput";
import MultiComboboxInput from "@/components/FormInputs/multi-combobox-input";
import { countries } from "@/lib/CountryData";
import PhoneInput from "@/components/FormInputs/PhoneInput";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { toast } = useToast();

  const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
    { value: "parent", label: "Parent" },
  ];

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
    { value: "orange", label: "Orange" },
    { value: "pineapple", label: "Pineapple" },
    { value: "strawberry", label: "Strawberry" },
    { value: "watermelon", label: "Watermelon" },
    { value: "blueberry", label: "Blueberry" },
    { value: "kiwi", label: "Kiwi" },
    { value: "pear", label: "Pear" },
    { value: "peach", label: "Peach" },
    { value: "pomegranate", label: "Pomegranate" },
    { value: "papaya", label: "Papaya" },
  ];
  const [phoneCode, setPhoneCode] = useState(false);

  async function onSubmit(data) {
    setIsLoading(true);

    if (!data.name || !data.email || !data.password || !data.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields including your role.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      const response = await signUp(userData);

      toast({
        title: "Success",
        description: "Account created successfully! Please sign in.",
      });

      reset();
      navigate("/sign-in");
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 w-full max-w-md">
      <div className="space-y-2">
        <h1 className="text-4xl font-medium tracking-tight">
          Create an account
        </h1>
        <p className="text-base">
          Enter your details below to create your account
        </p>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          icon={User}
          label="Full Name"
          register={register}
          name="name"
          type="text"
          errors={errors}
          placeholder="John Doe"
        />
        <TextInput
          icon={Mail}
          label="Email Address"
          register={register}
          name="email"
          type="email"
          errors={errors}
          placeholder="johndoe@gmail.com"
        />
        <PasswordInput
          icon={Lock}
          label="Password"
          register={register}
          name="password"
          type="password"
          errors={errors}
          placeholder="******"
        />

        <RadioInput
          register={register}
          errors={errors}
          name="role"
          label="Select your role"
          gridSize={2}
          options={roleOptions}
        />

        <ComboboxInput
          register={register}
          errors={errors}
          name="category"
          label="Category"
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          toolTipText="Select a category"
        />
        <PhoneInput
          register={register}
          errors={errors}
          name="contactPhone"
          label="Contact Phone"
          toolTipText="Please provide a valid US phone number"
        />

        <MultiComboboxInput
          register={register}
          errors={errors}
          name="fruits"
          label="Select Fruits"
          options={options}
          placeholder="Choose fruits..."
          showSearch={true}
          toolTipText="Select one or more fruits"
        />

        <SubmitButton
          buttonIcon={UserPlus}
          title="Create Account"
          loading={isLoading}
          loadingTitle="Creating your account..."
        />
      </form>
      <div className="text-center lg:text-left">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
