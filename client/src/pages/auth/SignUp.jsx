import React from "react";
import Logo from "@/components/ui/logo";
import SignUpForm from "@/components/Forms/Onboard.jsx/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left section with testimonial*/}
      <div className="hidden md:flex md:flex-1 p-8 flex-col justify-between bg-muted bg-[url('/slide1.jpg')] bg-cover bg-center bg-no-repeat">
        <Logo />
        <div className="max-w-md">
          <blockquote className="text-2xl font-medium">
            "This system has made managing our school so much easier and more
            efficient."
          </blockquote>
          <div className="mt-4">School Sync Administrator</div>
        </div>
      </div>

      {/* Right section with form */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-medium tracking-tight">
              Create your account
            </h1>
            <p className="text-base">
              Enter your details below to sign up for a new account
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
