import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import TeacherForm from "@/components/Forms/Dashboard/Teacher/TeacherForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateTeachers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (teacherData) => {
    try {
      if (id) {
        // await updateTeacher(id, teacherData);
        toast({
          title: "Success",
          description: "Teacher updated successfully",
        });
      } else {
        // await createTeacher(teacherData);
        toast({
          title: "Success",
          description: "Teacher created successfully",
        });
      }
      // navigate('/teachers');
    } catch (error) {
      console.error("Error saving teacher:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the teacher",
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className="sm:h-full md:h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-4 p-4 md:p-8 max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Register Teachers
            </h1>
            <p className="text-muted-foreground mt-2">
              Efficiently manage teacher registrations
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/teachers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teachers
            </Link>
          </Button>
        </div>

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <TeacherForm editingId={id} onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </div>

        <TooltipProvider>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Registration Tips</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Registration tips</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful tips for efficient teacher registration</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Verify teaching credentials and certifications.</li>
                <li>Include complete educational background details.</li>
                <li>Specify subject specializations and grade levels.</li>
                <li>Add professional experience and references.</li>
                <li>Upload required documentation in the correct format.</li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
