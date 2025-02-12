import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import ClassList from "./classes/ClassList";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AcademicSidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <GraduationCap />
          <h2 className="text-xl font-semibold">Classes</h2>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/academics/classes/new">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search classes..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1">
        <ClassList />
      </ScrollArea>
    </div>
  );
}
