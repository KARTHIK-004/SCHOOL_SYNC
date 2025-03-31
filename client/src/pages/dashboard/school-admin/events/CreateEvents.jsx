import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, HelpCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useToast } from "@/hooks/use-toast";
import { EventForm } from "@/components/Forms/Dashboard/Events/EventForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (eventData) => {
    try {
      if (id) {
        // await updateEvent(id, eventData);
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        // await createEvent(eventData);
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }
      navigate("/dashboard/events");
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the event",
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
              {id ? "Edit Event" : "Create Event"}
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage school events, activities and important dates
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <EventForm editingId={id} initialData={null} />
            </CardContent>
          </Card>
        </div>

        <TooltipProvider>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Event Creation Tips</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Event creation tips</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful tips for effective event management</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide a clear, descriptive title for the event.</li>
                <li>Double-check date and time details for accuracy.</li>
                <li>
                  Add a comprehensive description with all relevant details.
                </li>
                <li>
                  Specify the right department to ensure proper visibility.
                </li>
                <li>
                  Set the appropriate event type for better categorization.
                </li>
                <li>
                  Contact the IT support team if you encounter any issues.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
