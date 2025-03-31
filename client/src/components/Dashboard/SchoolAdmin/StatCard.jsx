import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, GraduationCap, UserCircle, BookOpen } from "lucide-react";

export default function StatCard({ schoolStats }) {
  return (
    <div>
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
            <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
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
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
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
    </div>
  );
}
