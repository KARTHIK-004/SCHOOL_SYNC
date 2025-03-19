import { useEffect, useState } from "react";
import {
  Book,
  Pencil,
  Plus,
  FileText,
  ListFilter,
  CheckCircle,
  Trash,
  BookOpen,
  Menu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllSubjects } from "@/utils/subjectAPI";
import SubjectList from "./SubjectList";
import SubjectDetails from "./SubjectDetails";

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllSubjects(userData);
        const subjects = response.data || [];
        setSubjects(subjects);
        if (subjects && subjects.length > 0) {
          setSelectedSubject(subjects[0]);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast({
          variant: "destructive",
          title: "Error fetching subjects",
          description: error.message || "Please try again later.",
        });
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for selecting a subject
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
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
            <SheetTitle>Subject Navigation</SheetTitle>
            <SheetDescription>Browse and manage subjects</SheetDescription>
          </SheetHeader>
          <SubjectList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            subjects={filteredSubjects}
            selectedSubject={selectedSubject}
            onSelect={handleSelectSubject}
            isLoading={isLoading}
            isMobile
          />
        </SheetContent>
      </Sheet>

      {/* Sidebar (Desktop) */}
      <SubjectList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        subjects={filteredSubjects}
        selectedSubject={selectedSubject}
        onSelect={handleSelectSubject}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        <SubjectDetails
          selectedSubject={selectedSubject}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
