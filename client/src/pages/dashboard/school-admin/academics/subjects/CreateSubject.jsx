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
import { SubjectForm } from "@/components/Forms/Dashboard/Academics/Subject/SubjectForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateSubject() {
  const { id } = useParams();
  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectData, setSubjectData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (id) {
        // await updateSubject(id, data);
        toast({
          title: "Success",
          description: "Subject updated successfully",
        });
      } else {
        // await createSubject(data);
        toast({
          title: "Success",
          description: "Subject created successfully",
        });
      }
      navigate("/dashboard/academics/subjects");
    } catch (error) {
      console.error("Error saving subject:", error);
      const errorMessage = error.message || "An error occurred";
      toast({
        title: "Error",
        description:
          errorMessage || "An error occurred while saving the subject",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="sm:h-full md:h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-4 p-4 md:p-8 max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {id ? "Edit" : "Register"} Subject{" "}
              {subjectName ? `- ${subjectName}` : ""}
            </h1>
            <p className="text-muted-foreground mt-2">
              {id ? "Update" : "Create"} and manage academic subjects
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/academics/subjects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Subjects
            </Link>
          </Button>
        </div>

        {error && <InfoBanner message={error} type="error" />}

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <SubjectForm editingId={id} initialData={subjectData} />
            </CardContent>
          </Card>
        </div>

        <TooltipProvider>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Subject Guidelines</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Subject guidelines</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Important guidelines for setting up academic subjects</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create descriptive subject names and unique codes.</li>
                <li>Specify the associated department and academic year.</li>
                <li>Define learning objectives and outcomes.</li>
                <li>Set curriculum and assessment guidelines.</li>
                <li>Include any prerequisites or special requirements.</li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
