import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CalendarDays, ClipboardList } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getTeacherByUserId } from "@/utils/teacherAPI";
import { getCurrentUser } from "@/utils/authAPI";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeacherWelcomeBanner from "@/components/Dashboard/Teacher/TeacherWelcomeBanner";
import { getDepartmentById } from "@/utils/departmentAPI";
import { getAllSections } from "@/utils/sectionAPI";

export default function TeacherDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [teacherSections, setTeacherSections] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getTeacherData = async () => {
      try {
        const userData = await getCurrentUser();
        const teacherResponse = await getTeacherByUserId(userData.id);
        const teacherData = teacherResponse.data || [];

        // Fetch sections and filter by teacher ID
        const sectionsResponse = await getAllSections();
        console.log(sectionsResponse.data);
        const filteredSections = sectionsResponse.data.filter(
          (section) => section.teacherId === teacherData._id
        );
        setTeacherSections(filteredSections);

        try {
          const departmentResponse = await getDepartmentById(
            teacherData.department
          );
          setTeacher({
            ...teacherData,
            departmentName: departmentResponse.data.departmentName,
          });
        } catch (error) {
          console.error("Error fetching department:", error);
          setTeacher(teacherData);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while fetching teacher data.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    getTeacherData();
  }, [navigate, toast]);

  console.log(teacher);

  console.log(teacherSections);

  if (loading) {
    return (
      <ScrollArea className="md:h-[calc(100vh-4rem)]">
        <div className="flex-1 space-y-4 p-4 md:p-8">
          <div className="h-24 bg-primary/20 animate-pulse rounded-lg"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-muted animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <TeacherWelcomeBanner teacherData={teacher} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Sections</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teacherSections.length || 0}
              </div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/teacher/classes">View Sections</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teacherSections.reduce(
                  (total, section) => total + (section.students?.length || 0),
                  0
                )}
              </div>

              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/teacher/students">View Students</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Classes
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/teacher/timetable">View Schedule</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Pending review</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">Class 10 Mathematics</p>
                    <p className="text-xs text-muted-foreground">
                      9:00 AM - 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">Class 9 Mathematics</p>
                    <p className="text-xs text-muted-foreground">
                      11:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ClipboardList className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">Assignment Graded</p>
                    <p className="text-xs text-muted-foreground">
                      Class 10 - Mathematics
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">Attendance Updated</p>
                    <p className="text-xs text-muted-foreground">
                      Class 9 - Mathematics
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
