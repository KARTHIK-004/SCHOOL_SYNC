import React from "react";
import {
  GraduationCap,
  Users,
  CalendarDays,
  BookOpen,
  ClipboardList,
  Settings2,
  School,
  DollarSign,
  Bell,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar/nav-main";
import { NavProjects } from "@/components/Sidebar/nav-projects";
import { NavUser } from "@/components/Sidebar/nav-user";
import { SidebarLogo } from "./sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
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
        {
          title: "Directory",
          url: "#",
        },
        {
          title: "Attendance",
          url: "#",
        },
        {
          title: "Performance",
          url: "#",
        },
        {
          title: "Behavior",
          url: "#",
        },
      ],
    },
    {
      title: "Academics",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Courses",
          url: "#",
        },
        {
          title: "Grades",
          url: "#",
        },
        {
          title: "Assignments",
          url: "#",
        },
        {
          title: "Resources",
          url: "#",
        },
      ],
    },
    {
      title: "Schedule",
      url: "#",
      icon: CalendarDays,
      items: [
        {
          title: "Calendar",
          url: "#",
        },
        {
          title: "Timetable",
          url: "#",
        },
        {
          title: "Events",
          url: "#",
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Staff",
          url: "#",
        },
        {
          title: "Departments",
          url: "#",
        },
        {
          title: "Facilities",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Fee Management",
      url: "#",
      icon: DollarSign,
    },
    {
      name: "Examinations",
      url: "#",
      icon: ClipboardList,
    },
    {
      name: "Announcements",
      url: "#",
      icon: Bell,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
