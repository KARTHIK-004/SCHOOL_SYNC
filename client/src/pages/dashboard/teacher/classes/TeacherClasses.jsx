import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, CalendarDays } from "lucide-react";

// Demo data
const demoClasses = [
  {
    _id: "c1",
    className: "Mathematics 101",
    subject: "Mathematics",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    students: Array(18).fill({}),
  },
  {
    _id: "c2",
    className: "Introduction to Physics",
    subject: "Physics",
    schedule: "Tue, Thu - 10:30 AM",
    students: Array(22).fill({}),
  },
  {
    _id: "c3",
    className: "English Literature",
    subject: "English",
    schedule: "Mon, Wed - 1:00 PM",
    students: Array(16).fill({}),
  },
  {
    _id: "c4",
    className: "World History",
    subject: "History",
    schedule: "Tue, Thu - 2:15 PM",
    students: Array(20).fill({}),
  },
  {
    _id: "c5",
    className: "Computer Science Foundations",
    subject: "Computer Science",
    schedule: "Wed, Fri - 11:00 AM",
    students: Array(15).fill({}),
  },
  {
    _id: "c6",
    className: "Biology Lab",
    subject: "Biology",
    schedule: "Mon, Thu - 3:30 PM",
    students: Array(24).fill({}),
  },
];

export default function TeacherClasses() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setClasses(demoClasses);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 md:p-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Classes</h2>
          <Button asChild>
            <Link to="/dashboard/teacher/classes/create">Create New Class</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <Card key={classItem._id}>
              <CardHeader>
                <CardTitle>{classItem.className}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Students: {classItem.students?.length || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Subject: {classItem.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Schedule: {classItem.schedule}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
