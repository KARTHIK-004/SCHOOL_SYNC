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
import { TermForm } from "@/components/Forms/Dashboard/Academics/Term/TermForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateTerm() {
  const { id } = useParams();
  const location = useLocation();
  const termName = location.state?.termName;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termData, setTermData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (id) {
        // await updateTerm(id, data);
        toast({
          title: "Success",
          description: "Term updated successfully",
        });
      } else {
        // await createTerm(data);
        toast({
          title: "Success",
          description: "Term created successfully",
        });
      }
      navigate("/dashboard/academics/terms");
    } catch (error) {
      console.error("Error saving term:", error);
      const errorMessage = error.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage || "An error occurred while saving the term",
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
              {id ? "Edit" : "Register"} Term {termName ? `- ${termName}` : ""}
            </h1>
            <p className="text-muted-foreground mt-2">
              {id ? "Update" : "Create"} and manage academic terms
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/academics/terms">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Terms
            </Link>
          </Button>
        </div>

        {error && <InfoBanner message={error} type="error" />}

        <div className="container mx-auto max-w-6xl">
          <Card className="mt-4 border">
            <CardContent className="p-6">
              <TermForm editingId={id} initialData={termData} />
            </CardContent>
          </Card>
        </div>

        <TooltipProvider>
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Term Guidelines</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Term guidelines</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Important guidelines for setting up academic terms</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use clear and consistent naming for academic terms.</li>
                <li>Define accurate start and end dates for each term.</li>
                <li>Specify the associated academic year and sessions.</li>
                <li>Set grading periods and assessment schedules.</li>
                <li>Include holiday and break periods within the term.</li>
              </ul>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
