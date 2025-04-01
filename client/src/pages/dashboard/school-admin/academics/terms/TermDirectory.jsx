import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

// Dummy terms data
const dummyTerms = [
  {
    id: 1,
    name: "First Term 2023",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Second Term 2023",
    startDate: "2024-01-08",
    endDate: "2024-03-22",
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Third Term 2023",
    startDate: "2024-04-10",
    endDate: "2024-06-28",
    status: "Upcoming",
  },
];

export default function TermDirectory() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
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

        <Card>
          <CardHeader>
            <CardTitle>Current Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyTerms.map((term) => (
                <Card
                  key={term.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <CalendarDays className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{term.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-sm text-muted-foreground">
                          <div>
                            <p className="font-medium">Start Date</p>
                            <p>{term.startDate}</p>
                          </div>
                          <div>
                            <p className="font-medium">End Date</p>
                            <p>{term.endDate}</p>
                          </div>
                          <div>
                            <p className="font-medium">Status</p>
                            <p
                              className={`font-medium ${
                                term.status === "Active"
                                  ? "text-green-500"
                                  : term.status === "Upcoming"
                                  ? "text-yellow-500"
                                  : "text-gray-500"
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
                            to={`/dashboard/academics/terms/edit/${term.id}`}
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
      </div>
    </ScrollArea>
  );
}
