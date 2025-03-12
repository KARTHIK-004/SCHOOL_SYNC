import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock, LogIn, Mail } from "lucide-react";
import { signIn } from "@/utils/authAPI";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getSchoolsByUserId } from "@/utils/schoolAPI";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignInForm() {
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

  // Simulate form loading (you can replace this with actual data loading if needed)
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
      const response = await signIn(data.email, data.password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.data.user.role);

      // Check onboarding status for school admins
      if (response.data.user.role === "schoolAdmin") {
        const user = await getCurrentUser();
        const schoolRes = await getSchoolsByUserId(user.id);

        if (schoolRes?.data?.schools?.length > 0) {
          navigate("/dashboard");
        } else {
          navigate("/school-onboard");
        }
      } else {
        navigate("/dashboard");
      }

      toast({ title: "Success", description: "Welcome back!" });
      reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign In Failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFormLoading) {
    return (
      <div className="space-y-8 w-full max-w-md">
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
        <div className="text-center lg:text-left">
          <Skeleton className="h-5 w-48 mx-auto lg:mx-0" />
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
