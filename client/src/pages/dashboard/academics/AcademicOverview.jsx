import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import AcademicSidebar from "./AcademicSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionList } from "./sections/SectionList";
import { Outlet } from "react-router-dom";

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
          <AcademicSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 border-r bg-background">
        <div className="px-4 h-full">
          <AcademicSidebar />
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
