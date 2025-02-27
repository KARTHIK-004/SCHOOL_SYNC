import React from "react";
import { NavMain } from "./nav-main";
import NavUser from "./nav-user";
import { NavConfig } from "./nav-config";
import { SidebarLogo } from "./sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navigationData } from "./nav-data";

export function AppSidebar({ ...props }) {
  // Get user role from localStorage or context
  const userRole = localStorage.getItem("userRole") || "schoolAdmin"; // Default to student if no role found

  // Get navigation data based on user role
  const roleNavigation = navigationData[userRole] || navigationData.schoolAdmin;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={roleNavigation.navMain} />
        <NavConfig configurations={roleNavigation.configurations} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
