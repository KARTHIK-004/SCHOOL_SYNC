import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [roleNavigation, setRoleNavigation] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
      return;
    }
    const filteredNav = navigationData[user.role] || navigationData.default;
    setRoleNavigation(filteredNav);
  }, [navigate]);

  if (!roleNavigation) return null;

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
