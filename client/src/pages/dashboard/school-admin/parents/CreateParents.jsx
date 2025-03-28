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
import ParentForm from "@/components/Forms/Dashboard/Parents/ParentForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateParents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (parentData) => {
    try {
      if (id) {
        // await updateParent(id, parentData);
        toast({
          title: "Success",
          description: "Parent updated successfully",
        });
      } else {
        // await createParent(parentData);
        toast({
          title: "Success",
          description: "Parent created successfully",
        });
      }
      // navigate('/parents');
    } catch (error) {
      console.error("Error saving parent:", error);
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while saving the parent",
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
              Register Parents
            </h1>
            <p className="text-muted-foreground mt-2">
              Efficiently manage parent registrations
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/parents">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Parents
            </Link>
          </Button>
        </div>

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <ParentForm editingId={id} onSubmit={handleSubmit} />
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
                    <p>Helpful tips for efficient parent registration</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ensure all required fields are filled accurately.</li>
                <li>Verify parent information before submission.</li>
                <li>
                  Include preferred contact method and additional contact
                  details.
                </li>
                <li>Double-check nationality and ID/passport information.</li>
                <li>
                  Contact support if you encounter any issues during the
                  process.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
