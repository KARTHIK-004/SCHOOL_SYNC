import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavConfig({ configurations }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configurations</SidebarGroupLabel>
      <SidebarMenu>
        {configurations.map((config) => (
          <SidebarMenuItem key={config.name}>
            <SidebarMenuButton asChild>
              <a href={config.url} className="w-full" aria-label={config.name}>
                {config.icon && <config.icon className="w-5 h-5" />}
                <span>{config.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
