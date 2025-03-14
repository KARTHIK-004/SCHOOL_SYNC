import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import { createSchool } from "@/utils/schoolAPI";
import { getCurrentUser } from "@/utils/authAPI";

import SchoolDetailsForm from "@/components/Forms/Onboard.jsx/SchoolDetailsForm";
import SchoolOnboardForm from "@/components/Forms/Onboard.jsx/SchoolOnboardForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function SchoolRegistration() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [schoolData, setSchoolData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sign-in");
          return;
        }

        const user = await getCurrentUser();

        if (user.schoolId) {
          toast({
            title: "School Already Registered",
            description: "You already have a school registered.",
          });
          navigate("/dashboard");
          return;
        }

        if (user.role !== "schoolAdmin") {
          toast({
            title: "Access Restricted",
            description: "Only school administrators can register schools.",
          });
          navigate("/dashboard");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Authentication Error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    };

    checkUserStatus();
  }, [navigate, toast]);

  const handleSchoolOnboardSubmit = (data) => {
    setSchoolData(data);
    setStep(2);
  };

  const handleSchoolDetailsSubmit = async (detailsData) => {
    try {
      setIsLoading(true);
      const completeData = {
        ...schoolData,
        ...detailsData,
      };

      const user = await getCurrentUser();

      if (!user || !user.id) {
        throw new Error("User ID is not available.");
      }

      const response = await createSchool({ ...completeData, userId: user.id });

      toast({
        title: "School Registration Successful",
        description: "Your school has been registered successfully.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card className="w-full max-w-md border-primary/20 border rounded-lg shadow-sm">
          <CardHeader className="space-y-1 text-center pb-2">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-72 mx-auto" />

            {/* Stepper Component Skeleton */}
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-12 h-1" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md border-primary/20 border rounded-lg shadow-sm">
        <CardHeader className="space-y-1 text-center pb-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            Welcome to School Pro,
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {step === 1
              ? "Complete your school's basic information to get started."
              : "Add more details about your school to complete registration."}
          </CardDescription>

          {/* Stepper Component */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
              </div>
              <div
                className={`w-12 h-1 ${step > 1 ? "bg-primary" : "bg-muted"}`}
              ></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
            </div>
          </div>
        </CardHeader>

        {step === 1 ? (
          <>
            <CardContent className="space-y-4 pt-4">
              <SchoolOnboardForm onSubmit={handleSchoolOnboardSubmit} />
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="space-y-4 pt-4">
              <SchoolDetailsForm onSubmit={handleSchoolDetailsSubmit} />
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
