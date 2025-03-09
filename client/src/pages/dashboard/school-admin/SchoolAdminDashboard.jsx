import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  UserCircle,
  BookOpen,
  CalendarDays,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SchoolAdminDashboard() {
  return (
    <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">School Overview</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/students">View Details</Link>
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
              <div className="text-2xl font-bold">145</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/teachers">View Details</Link>
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
              <div className="text-2xl font-bold">48</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/academics/classes">View Details</Link>
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
              <div className="text-2xl font-bold">1,890</div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/parents">View Details</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-2">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/dashboard/students/create">
                  <Users className="mr-2 h-4 w-4" />
                  Add Student
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/dashboard/teachers/create">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Add Teacher
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/dashboard/academics/classes/create">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Class
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/dashboard/parents/create">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Add Parent
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">New Student Enrolled</p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">
                      Teacher Attendance Updated
                    </p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">
                      New Announcement Posted
                    </p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">
                      Class Schedule Updated
                    </p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
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
