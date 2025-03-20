import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import ClassList from "./classes/ClassList";
// import ClassDetails from "./ClassDetails";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllClasses } from "@/utils/classAPI";
import SectionList from "./sections/SectionList";

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllClasses(userData);
        const classes = response.data || [];
        setClasses(classes);
        if (classes.length > 0) {
          setSelectedClass(classes[0]);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast({
          variant: "destructive",
          title: "Error fetching classes",
          description: error.message || "Please try again later.",
        });
        setClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter classes based on search query
  const filteredClasses = classes.filter((cls) =>
    cls.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for selecting a class
  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setIsSheetOpen(false);
  };

  return (
    <div className="flex h-full w-full relative">
      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="md:hidden absolute top-6 right-4 z-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <SheetHeader>
            <SheetTitle>Class Navigation</SheetTitle>
            <SheetDescription>Browse and manage classes</SheetDescription>
          </SheetHeader>
          <ClassList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            classes={filteredClasses}
            selectedClass={selectedClass}
            onSelect={handleSelectClass}
            isLoading={isLoading}
            isMobile
          />
        </SheetContent>
      </Sheet>

      {/* Sidebar (Desktop) */}
      <ClassList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        classes={filteredClasses}
        selectedClass={selectedClass}
        onSelect={handleSelectClass}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        <SectionList selectedClass={selectedClass} isLoading={isLoading} />
      </div>
    </div>
  );
}
