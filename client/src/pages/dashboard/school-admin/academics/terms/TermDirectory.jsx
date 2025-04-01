import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllTerms } from "@/utils/termAPI";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function TermDirectory() {
  const [terms, setTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllTerms(userData);
        const termsData = response.data.data;
        setTerms(termsData);
      } catch (error) {
        console.error("Error fetching terms:", error);
        toast({
          variant: "destructive",
          title: "Error fetching terms",
          description: error.message || "Please try again later.",
        });
        setTerms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const getTermStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today >= start && today <= end) {
      return "Active";
    } else if (today < start) {
      return "Upcoming";
    } else {
      return "Completed";
    }
  };

  if (isLoading)
    return (
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-11 w-11 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-9 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );

  if (terms.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Terms Found</h3>
          <p className="text-muted-foreground mb-4">
            You haven't created any academic terms yet.
          </p>
          <Button asChild>
            <Link to="/dashboard/academics/terms/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Term
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const groupTermsByYear = () => {
    const grouped = {};

    terms.forEach((term) => {
      const year = term.academicYear;

      if (!grouped[year]) {
        grouped[year] = [];
      }
      const status = getTermStatus(term.startDate, term.endDate);

      grouped[year].push({
        ...term,
        status,
      });
    });

    return Object.entries(grouped)
      .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
      .map(([year, terms]) => ({
        year,
        terms,
      }));
  };

  const termsByYear = groupTermsByYear();

  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Academic Terms</h2>
          </div>
          <Button asChild>
            <Link to="/dashboard/academics/terms/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Term
            </Link>
          </Button>
        </div>
        {termsByYear.map(({ year, terms }) => (
          <Card key={year} className="mb-6">
            <CardHeader>
              <CardTitle>Academic Year {year}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {terms.map((term) => (
                  <Card
                    key={term._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <CalendarDays className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{term.termName}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-sm text-muted-foreground">
                            <div>
                              <p className="font-medium">Start Date</p>
                              <p>
                                {new Date(term.startDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">End Date</p>
                              <p>
                                {new Date(term.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Status</p>
                              <p
                                className={`font-medium ${
                                  term.status === "Active"
                                    ? "text-success"
                                    : term.status === "Upcoming"
                                    ? "text-warning"
                                    : ""
                                }`}
                              >
                                {term.status}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              to={`/dashboard/academics/terms/edit/${term._id}`}
                            >
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
