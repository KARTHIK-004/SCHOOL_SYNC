import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Lock, LogIn, Mail } from "lucide-react";

import TextInput from "@/components/FormInputs/TextInput";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Skeleton } from "@/components/ui/skeleton";

import { signIn } from "@/utils/authAPI";
import { useToast } from "@/hooks/use-toast";

export default function SignInForm() {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);

  // Form handling
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

    if (!data.email || !data.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signIn(data.email, data.password);
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign In Failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Loading state
  if (isFormLoading) {
    return (
      <div className="space-y-8 w-full max-w-md mx-auto p-6 rounded-lg shadow-sm">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full mt-2" />
        </div>
        <div className="text-center">
          <Skeleton className="h-5 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-md">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          icon={Mail}
          label="Email Address"
          register={register}
          name="email"
          type="email"
          errors={errors}
          placeholder="Eg. johndoe@gmail.com"
        />
        <PasswordInput
          icon={Lock}
          label="Password"
          register={register}
          name="password"
          type="password"
          errors={errors}
          placeholder="******"
          forgotPasswordLink="/forgot-password"
        />

        <SubmitButton
          buttonIcon={LogIn}
          title="Sign In"
          loading={isLoading}
          loadingTitle="Signing in..."
        />
      </form>
      <div className="text-center lg:text-left">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
