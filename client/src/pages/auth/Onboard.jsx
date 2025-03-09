import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import SchoolAdminForm from "@/components/Forms/Auth/SchoolAdminForm";
import SchoolOnboardForm from "@/components/Forms/Auth/SchoolOnboardForm";

export default function SchoolRegistration() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md border-primary/20 border rounded-lg shadow-sm">
        <CardHeader className="space-y-1 text-center pb-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            Welcome to School Pro,
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {step === 1
              ? "Complete your school's profile to get started with SchoolPro."
              : "Create the Admin for this School"}
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
              <SchoolOnboardForm />
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="space-y-4 pt-4">
              <SchoolAdminForm />
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
