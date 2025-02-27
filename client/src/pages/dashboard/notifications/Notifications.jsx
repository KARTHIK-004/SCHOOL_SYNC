import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  MessageCircle,
  Users,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Student Registration",
    message: "John Smith has been registered to Class 10-A",
    time: "2 minutes ago",
    type: "student",
    icon: Users,
  },
  {
    id: 2,
    title: "Assignment Due",
    message: "Mathematics homework due tomorrow for Class 9",
    time: "1 hour ago",
    type: "academic",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Parent Meeting",
    message: "Scheduled parent-teacher meeting next week",
    time: "2 hours ago",
    type: "meeting",
    icon: Calendar,
  },
  {
    id: 4,
    title: "Teacher Update",
    message: "Ms. Johnson has updated the class schedule",
    time: "3 hours ago",
    type: "teacher",
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "System Update",
    message: "New features have been added to the platform",
    time: "1 day ago",
    type: "system",
    icon: Bell,
  },
];

export default function Notifications() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="flex items-start space-x-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="rounded-full bg-muted p-2">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
