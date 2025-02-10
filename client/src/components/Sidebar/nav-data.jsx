import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  Settings2,
  Bell,
  Settings,
  UserCircle,
  GraduationCap,
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
      title: "Parents",
      url: "#",
      icon: UserCircle,
      items: [
        { title: "Directory", url: "/dashboard/parents" },
        { title: "Meetings", url: "/dashboard/parents/meetings" },
        { title: "Communication", url: "/dashboard/parents/communication" },
        { title: "Feedback", url: "/dashboard/parents/feedback" },
      ],
    },
    {
      title: "Teachers",
      url: "#",
      icon: GraduationCap,
      items: [
        { title: "Directory", url: "/dashboard/teachers" },
        { title: "Meetings", url: "/dashboard/teachers/meetings" },
        { title: "Communication", url: "/dashboard/teachers/communication" },
        { title: "Feedback", url: "/dashboard/teachers/feedback" },
      ],
    },
    {
      title: "Academics",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Classes", url: "/dashboard/classes" },
        { title: "Sections", url: "/dashboard/sections" },
        { title: "Timetable", url: "/dashboard/classes/timetable" },
        { title: "Assignments", url: "/dashboard/classes/assignments" },
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
