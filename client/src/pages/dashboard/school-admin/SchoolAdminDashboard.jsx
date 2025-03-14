import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  UserCircle,
  BookOpen,
  CalendarDays,
  Settings,
  Mail,
  Phone,
  School,
  BookType,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getMySchool, getSchoolById } from "@/utils/schoolAPI";
import WelcomeBanner from "@/components/Dashboard/SchoolAdmin/WelcomeBanner";

export default function SchoolAdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const [schoolStats, setSchoolStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    classes: 0,
  });

  useEffect(() => {
    const checkSchoolRegistration = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        if (!userData.school) {
          toast({
            title: "School Registration Required",
            description: "Please register your school to continue.",
          });
          navigate("/school-onboard");
          return;
        }

        const schoolData = await getMySchool(userData.id);
        setSchool(schoolData);

        // Set actual stats from your API when available
        setSchoolStats({
          students: 0,
          teachers: 0,
          parents: 0,
          classes: 0,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Authentication Error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
        // navigate("/sign-in");
      }
    };

    checkSchoolRegistration();
  }, [navigate, toast]);

  if (loading) {
    return (
      <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
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
    <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        {/* School Info Card */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center gap-4">
              {school?.schoolLogo && (
                <img
                  src={school.schoolLogo}
                  alt={school.schoolName}
                  className="w-16 h-16 object-contain"
                />
              )}
              <div>
                <CardTitle className="text-2xl">{school?.schoolName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Administrator: {school?.adminName}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">School Type</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {school?.schoolType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookType className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Curriculum</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {school?.curriculum}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {school?.contactEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {school?.phone}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <WelcomeBanner schoolData={school} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.students}</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/students">View Students</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.teachers}</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/teachers">View Teachers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Parents
              </CardTitle>
              <UserCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.parents}</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/parents">View Parents</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Classes
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{schoolStats.classes}</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/academics/classes">View Classes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">
                      New Student Registration
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">
                      Teacher Attendance Updated
                    </p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">New Event Added</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/dashboard/students/create">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Student
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/dashboard/teachers/create">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Add New Teacher
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  School Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
