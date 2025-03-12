import React, { useEffect, useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMySchool } from "@/utils/schoolAPI";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarLogo() {
  const { toast } = useToast();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await getMySchool();
        setSchool(response.data.school);
      } catch (error) {
        console.error("Error fetching school:", error.response?.data);

        toast({
          title: "Error",
          description: "Failed to load school information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSchool();
  }, [toast]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to="/dashboard">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            {loading ? (
              <>
                <Skeleton className="aspect-square size-8 rounded-lg bg-primary/20" />
                <div className="grid flex-1 gap-1">
                  <Skeleton className="h-4 w-24 bg-primary/20" />
                  <Skeleton className="h-3 w-16 bg-primary/20" />
                </div>
              </>
            ) : (
              <>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <span className="rounded-full bg-primary p-1 text-secondary">
                    <GraduationCap />
                  </span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {school?.schoolName || "School Sync"}
                  </span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </>
            )}
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
