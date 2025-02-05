import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { NavUser } from "./nav-user";
import { ModeToggle } from "../theme/ModeToggle";

function SidebarHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex h-16 items-center gap-4 border-b bg-background px-4 shadow-sm">
      <SidebarTrigger />
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Button variant="outline" size="icon">
        <Plus className="h-5 w-5" />
        <span className="sr-only">Add new</span>
      </Button>
      <ModeToggle />
      <NavUser />
    </div>
  );
}

export default SidebarHeader;
