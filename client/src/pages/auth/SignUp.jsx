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

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { toast } = useToast();

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  async function onSubmit(data) {
    setIsLoading(true);

    if (!data.name || !data.email || !data.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
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
    <div className="w-full lg:grid h-screen lg:grid-cols-2 relative">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-14 md:top-5 md:left-5">
            <Logo />
          </div>
          <div className="grid gap-2 text-center mt-20 md:mt-0">
            <h1 className="text-3xl font-bold">Create your Account</h1>
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
              name="radioFieldName"
              label="Select an option"
              options={options}
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
              Already have an account?{"  "}
              <Link
                to="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
