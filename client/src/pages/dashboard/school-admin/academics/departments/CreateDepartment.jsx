import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
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
import InfoBanner from "@/components/ui/info-banner";
import { DepartmentForm } from "@/components/Forms/Dashboard/Academics/Department/DepartmentForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createDepartment } from "@/utils/department";

export default function CreateDepartment() {
  const { id } = useParams();
  const location = useLocation();
  const departmentName = location.state?.departmentName;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departmentData, setDepartmentData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (id) {
        // await updateDepartment(id, data);
        toast({
          title: "Success",
          description: "Department updated successfully",
        });
      } else {
        await createDepartment(data);
        toast({
          title: "Success",
          description: "Department created successfully",
        });
      }
      navigate("/dashboard/academics/departments");
    } catch (error) {
      console.error("Error saving department:", error);
      const errorMessage = error.message || "An error occurred";
      toast({
        title: "Error",
        description:
          errorMessage || "An error occurred while saving the department",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-4 p-4 md:p-8 max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {id ? "Edit" : "Register"} Department{" "}
              {departmentName ? `- ${departmentName}` : ""}
            </h1>
            <p className="text-muted-foreground mt-2">
              {id ? "Update" : "Create"} and manage school departments
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/academics/departments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Departments
            </Link>
          </Button>
        </div>

        {error && <InfoBanner message={error} type="error" />}

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <DepartmentForm editingId={id} initialData={departmentData} />
            </CardContent>
          </Card>
        </div>

        <TooltipProvider>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Department Guidelines</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Department guidelines</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Important guidelines for setting up school departments
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Define clear department name and code.</li>
                <li>Designate a department head or coordinator.</li>
                <li>Establish department-specific contact information.</li>
                <li>Outline the department's main academic focus.</li>
                <li>Specify any special resources or requirements.</li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
