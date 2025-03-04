import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Custom Components
import ClassList from "./classes/ClassList";

export default function AcademicOverview() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex h-full w-full relative">
      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <SheetHeader>
            <SheetTitle>Class Navigation</SheetTitle>
            <SheetDescription>
              Browse and manage your classes and sections
            </SheetDescription>
          </SheetHeader>
          <ClassList />
        </SheetContent>
      </Sheet>

      {/* Class List */}
      <div className="hidden md:block w-80 border-r bg-background">
        <div className="px-4 h-full">
          <ClassList />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        <ScrollArea className="h-full">
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
}
