import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Clock, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Dummy assignments data
const dummyAssignments = [
  {
    id: 1,
    title: "Algebra Homework",
    class: "Mathematics - Grade 10",
    dueDate: "2023-11-20",
    status: "pending",
    submissions: 15,
    totalStudents: 25,
  },
  {
    id: 2,
    title: "Science Project",
    class: "Science - Grade 9",
    dueDate: "2023-11-22",
    status: "graded",
    submissions: 20,
    totalStudents: 20,
  },
  {
    id: 3,
    title: "History Essay",
    class: "History - Grade 11",
    dueDate: "2023-11-18",
    status: "overdue",
    submissions: 10,
    totalStudents: 18,
  },
  {
    id: 4,
    title: "Literature Review",
    class: "English - Grade 10",
    dueDate: "2023-11-25",
    status: "pending",
    submissions: 12,
    totalStudents: 22,
  },
];

export default function TeacherAssignments() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6" />
            <h2 className="text-2xl font-bold">My Assignments</h2>
          </div>
          <Button asChild>
            <Link to="/dashboard/teacher/assignments/create">
              Create Assignment
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {dummyAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {assignment.status === "pending" && (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  {assignment.status === "graded" && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {assignment.status === "overdue" && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Class</p>
                    <p>{assignment.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p>{assignment.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submissions</p>
                    <p>
                      {assignment.submissions}/{assignment.totalStudents}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" asChild>
                    <Link
                      to={`/dashboard/teacher/assignments/${assignment.id}`}
                    >
                      View Details
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      to={`/dashboard/teacher/assignments/${assignment.id}/grade`}
                    >
                      Grade
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
