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
import TimetableForm from "@/components/Forms/Dashboard/Timetables/TimetableForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateTimetable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (timetableData) => {
    try {
      if (id) {
        // await updateTimetable(id, timetableData);
        toast({
          title: "Success",
          description: "Timetable updated successfully",
        });
      } else {
        // await createTimetable(timetableData);
        toast({
          title: "Success",
          description: "Timetable created successfully",
        });
      }
      // navigate('/dashboard/timetables');
    } catch (error) {
      console.error("Error saving timetable:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the timetable",
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-4 p-4 md:p-8 max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Timetable
            </h1>
            <p className="text-muted-foreground mt-2">
              Create and manage class schedules efficiently
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/timetables">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Timetables
            </Link>
          </Button>
        </div>

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <TimetableForm editingId={id} onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </div>

        <TooltipProvider>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Timetable Tips</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Timetable tips</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful tips for effective timetable management</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Create balanced schedules with appropriate breaks between
                  classes.
                </li>
                <li>
                  Avoid scheduling the same subject consecutively for better
                  learning outcomes.
                </li>
                <li>Consider teacher availability when scheduling classes.</li>
                <li>
                  Allocate appropriate time slots based on subject complexity.
                </li>
                <li>
                  Schedule resource-intensive subjects when students are most
                  attentive.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
