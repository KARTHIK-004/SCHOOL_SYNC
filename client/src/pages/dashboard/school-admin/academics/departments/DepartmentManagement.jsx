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
import DepartmentList from "./DepartmentList";
import DepartmentDetails from "./DepartmentDetails";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllDepartments } from "@/utils/departmentAPI";

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllDepartments(userData);
        const departments = response.data.data;
        setDepartments(departments);
        if (departments.length > 0) {
          setSelectedDepartment(departments[0]);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast({
          variant: "destructive",
          title: "Error fetching departments",
          description: error.message || "Please try again later.",
        });
        setDepartments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter departments based on search query
  const filteredDepartments = departments.filter((dept) =>
    dept.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for selecting a department
  const handleSelectDepartment = (dept) => {
    setSelectedDepartment(dept);
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
            <SheetTitle>Department Navigation</SheetTitle>
            <SheetDescription>Browse and manage departments</SheetDescription>
          </SheetHeader>
          <DepartmentList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            departments={filteredDepartments}
            selectedDepartment={selectedDepartment}
            onSelect={handleSelectDepartment}
            isLoading={isLoading}
            isMobile
          />
        </SheetContent>
      </Sheet>

      {/* Sidebar (Desktop) */}
      <DepartmentList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        departments={filteredDepartments}
        selectedDepartment={selectedDepartment}
        onSelect={handleSelectDepartment}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        <DepartmentDetails
          selectedDepartment={selectedDepartment}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
