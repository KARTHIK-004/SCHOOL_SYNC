import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import SchoolForm from "@/components/Forms/Dashboard/Schools/SchoolForm";

export default function CreateSchool() {
  const { toast } = useToast();

  const handleSubmit = async (schoolData) => {
    try {
      // await createSchool(schoolData);
      toast({
        title: "Success",
        description: "School registered successfully",
      });
      // navigate('/dashboard');
    } catch (error) {
      console.error("Error registering school:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while registering the school",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            School Registration
          </h1>
          <p className="text-muted-foreground mt-2">
            Register your school to get started with School Sync
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="container mx-auto max-w-6xl">
        <Card className="mt-4 border">
          <CardContent className="p-6">
            <SchoolForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>

      <TooltipProvider>
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Registration Guidelines</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Registration guidelines</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Important guidelines for school registration</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate school information and contact details.</li>
              <li>Upload clear and high-quality school logo.</li>
              <li>Ensure all required documentation is ready.</li>
              <li>Review school policies and terms of service.</li>
              <li>Set up administrator accounts after registration.</li>
            </ul>
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
}
