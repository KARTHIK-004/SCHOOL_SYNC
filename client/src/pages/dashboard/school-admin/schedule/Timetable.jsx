import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/utils/authAPI";
import { getTimetable } from "@/utils/timetableAPI";

export default function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getTimetable(userData.schoolId);
        setTimetable(response.data.data);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        toast({
          variant: "destructive",
          title: "Error fetching timetable",
          description: error.message || "Please try again later.",
        });
        setTimetable([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Dummy timetable data structure
  const dummyTimetable = {
    monday: [
      {
        time: "08:00 - 09:00",
        subject: "Mathematics",
        teacher: "John Smith",
        class: "Grade 10A",
      },
      {
        time: "09:00 - 10:00",
        subject: "Science",
        teacher: "Sarah Johnson",
        class: "Grade 10A",
      },
    ],
    tuesday: [
      {
        time: "08:00 - 09:00",
        subject: "English",
        teacher: "Emily Brown",
        class: "Grade 10A",
      },
    ],
    // ... other days
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6" />
            <h2 className="text-2xl font-bold">School Timetable</h2>
          </div>
          <Button asChild>
            <Link to="/dashboard/schedule/timetable/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Schedule
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(dummyTimetable).map(([day, schedules]) =>
                    schedules.map((schedule, index) => (
                      <tr key={`${day}-${index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index === 0 &&
                            day.charAt(0).toUpperCase() + day.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.teacher}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.class}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
