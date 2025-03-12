"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock, UserPlus, Mail, User } from "lucide-react";
import { signUp } from "@/utils/authAPI";
import { useToast } from "@/hooks/use-toast";
import ComboboxInput from "@/components/FormInputs/ComboBoxInput";
import { roleOptions } from "@/lib/formOption";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

  if (isFormLoading) {
    return (
      <>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full mt-2" />
        </div>
        <div className="text-center lg:text-left mt-8">
          <Skeleton className="h-5 w-48 mx-auto lg:mx-0" />
        </div>
      </>
    );
  }

  return (
    <>
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
        <ComboboxInput
          register={register}
          errors={errors}
          name="role"
          label="Select the role"
          options={roleOptions}
          toolTipText="Select a role"
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
    </>
  );
}
