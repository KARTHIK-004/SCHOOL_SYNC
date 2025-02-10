import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  Settings2,
  Bell,
  Settings,
} from "lucide-react";

export const navigationData = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Students",
      url: "#",
      icon: Users,
      items: [
        { title: "Directory", url: "/dashboard/students" },
        { title: "Attendance", url: "/dashboard/students/attendance" },
        { title: "Performance", url: "/dashboard/students/performance" },
        { title: "Behavior", url: "/dashboard/students/behavior" },
      ],
    },
    {
      title: "Academics",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Courses", url: "/dashboard/academics/courses" },
        { title: "Grades", url: "/dashboard/academics/grades" },
        { title: "Assignments", url: "/dashboard/academics/assignments" },
        { title: "Resources", url: "/dashboard/academics/resources" },
      ],
    },
    {
      title: "Schedule",
      url: "#",
      icon: CalendarDays,
      items: [
        { title: "Calendar", url: "/dashboard/schedule/calendar" },
        { title: "Timetable", url: "/dashboard/schedule/timetable" },
        { title: "Events", url: "/dashboard/schedule/events" },
      ],
    },
    {
      title: "Administration",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Staff", url: "/dashboard/admin/staff" },
        { title: "Departments", url: "/dashboard/admin/departments" },
        { title: "Facilities", url: "/dashboard/admin/facilities" },
        { title: "Settings", url: "/dashboard/admin/settings" },
      ],
    },
  ],
  configurations: [
    {
      name: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
