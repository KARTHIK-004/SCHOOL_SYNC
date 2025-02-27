import {
  BookOpen,
  GraduationCap,
  Calendar,
  BarChart,
  User,
  Settings,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Academics",
    items: [
      {
        title: "Courses",
        href: "/academics/courses",
        description: "View and manage courses",
        icon: BookOpen,
      },
      {
        title: "Students",
        href: "/academics/students",
        description: "Student management",
        icon: GraduationCap,
      },
      {
        title: "Schedule",
        href: "/academics/schedule",
        description: "Class and exam schedules",
        icon: Calendar,
      },
      {
        title: "Performance",
        href: "/academics/performance",
        description: "Student performance tracking",
        icon: BarChart,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Staff",
        href: "/admin/staff",
        description: "Manage teaching and staff",
        icon: User,
      },
      {
        title: "Departments",
        href: "/admin/departments",
        description: "Department management",
        icon: Settings,
      },
    ],
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
  },
];

export const userNavigationItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
