import { useState } from "react";
import { GraduationCap, Pencil, Plus, Trash, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SectionList from "../sections/SectionList";

export default function ClassManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Sample data for classes
  const [classes] = useState([
    {
      id: "1",
      name: "Class 10",
      code: "CL10",
      year: "2024-2025",
      category: "SECONDARY",
      classTeacher: "Mrs. Rebecca Wilson",
      department: "Secondary Education",
      created: "November 10th, 2024",
      lastUpdated: "November 15th, 2024",
      slug: "class-10",
      isActive: true,
      hasSections: true,
      totalSections: 4,
      totalStudents: 120,
      totalSubjects: 8,
      admissionOpen: true,
      sections: [
        {
          id: "1-A",
          name: "Section A",
          code: "CL10-A",
          sectionTeacher: "Mr. James Peterson",
          totalStudents: 35,
          capacity: 40,
          roomNumber: "R-101",
          schedule: "Morning",
          isActive: true,
          created: "November 12th, 2024",
          lastUpdated: "November 15th, 2024",
        },
        {
          id: "1-B",
          name: "Section B",
          code: "CL10-B",
          sectionTeacher: "Ms. Sarah Thompson",
          totalStudents: 32,
          capacity: 40,
          roomNumber: "R-102",
          schedule: "Morning",
          isActive: true,
          created: "November 12th, 2024",
          lastUpdated: "November 15th, 2024",
        },
        {
          id: "1-C",
          name: "Section C",
          code: "CL10-C",
          sectionTeacher: "Mrs. Emily Rodriguez",
          totalStudents: 28,
          capacity: 40,
          roomNumber: "R-103",
          schedule: "Morning",
          isActive: true,
          created: "November 12th, 2024",
          lastUpdated: "November 15th, 2024",
        },
        {
          id: "1-D",
          name: "Section D",
          code: "CL10-D",
          sectionTeacher: "Mr. Robert Chen",
          totalStudents: 25,
          capacity: 40,
          roomNumber: "R-104",
          schedule: "Morning",
          isActive: true,
          created: "November 12th, 2024",
          lastUpdated: "November 15th, 2024",
        },
      ],
    },
    {
      id: "2",
      name: "Class 11 Science",
      code: "CL11S",
      year: "2024-2025",
      category: "HIGHER SECONDARY",
      classTeacher: "Mr. Thomas Brown",
      department: "Science",
      created: "October 5th, 2024",
      lastUpdated: "October 25th, 2024",
      slug: "class-11-science",
      isActive: true,
      hasSections: true,
      totalSections: 3,
      totalStudents: 90,
      totalSubjects: 6,
      admissionOpen: true,
      sections: [
        {
          id: "2-A",
          name: "Section A",
          code: "CL11S-A",
          sectionTeacher: "Dr. Amanda Lee",
          totalStudents: 32,
          capacity: 35,
          roomNumber: "R-201",
          schedule: "Morning",
          isActive: true,
          created: "October 7th, 2024",
          lastUpdated: "October 25th, 2024",
        },
        {
          id: "2-B",
          name: "Section B",
          code: "CL11S-B",
          sectionTeacher: "Mr. David Wilson",
          totalStudents: 30,
          capacity: 35,
          roomNumber: "R-202",
          schedule: "Morning",
          isActive: true,
          created: "October 7th, 2024",
          lastUpdated: "October 25th, 2024",
        },
        {
          id: "2-C",
          name: "Section C",
          code: "CL11S-C",
          sectionTeacher: "Ms. Jennifer Park",
          totalStudents: 28,
          capacity: 35,
          roomNumber: "R-203",
          schedule: "Morning",
          isActive: true,
          created: "October 7th, 2024",
          lastUpdated: "October 25th, 2024",
        },
      ],
    },
    {
      id: "3",
      name: "Class 12 Commerce",
      code: "CL12C",
      year: "2024-2025",
      category: "HIGHER SECONDARY",
      classTeacher: "Ms. Angela Davis",
      department: "Commerce",
      created: "September 20th, 2024",
      lastUpdated: "October 2nd, 2024",
      slug: "class-12-commerce",
      isActive: true,
      hasSections: true,
      totalSections: 2,
      totalStudents: 65,
      totalSubjects: 6,
      admissionOpen: false,
      sections: [
        {
          id: "3-A",
          name: "Section A",
          code: "CL12C-A",
          sectionTeacher: "Mr. Richard Taylor",
          totalStudents: 35,
          capacity: 40,
          roomNumber: "R-301",
          schedule: "Morning",
          isActive: true,
          created: "September 22nd, 2024",
          lastUpdated: "October 2nd, 2024",
        },
        {
          id: "3-B",
          name: "Section B",
          code: "CL12C-B",
          sectionTeacher: "Ms. Laura Martinez",
          totalStudents: 30,
          capacity: 40,
          roomNumber: "R-302",
          schedule: "Morning",
          isActive: true,
          created: "September 22nd, 2024",
          lastUpdated: "October 2nd, 2024",
        },
      ],
    },
  ]);

  const [selectedClass, setSelectedClass] = useState(classes[0]);

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <div className="flex h-full w-full relative">
      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="md:hidden absolute top-6 right-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <SheetHeader>
            <SheetTitle>Class Navigation</SheetTitle>
            <SheetDescription>Browse and manage classes</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* Left sidebar */}
      <div className="hidden md:block w-80 border-r bg-background">
        <div className="px-4 h-full">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <GraduationCap />
                <h2 className="text-xl font-semibold">Classes</h2>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/academics/classes/create">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Search */}
            <div className="my-3">
              <Input
                type="search"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Class list */}
            <ScrollArea className="sm:h-full md:h-[calc(100vh-13rem)]">
              <ul className="space-y-1">
                {classes.map((classItem) => (
                  <li key={classItem.id}>
                    <div className="relative group">
                      <div
                        className={`block p-3 rounded-lg transition ${
                          selectedClass.id === classItem.id
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleSelectClass(classItem)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-medium truncate">
                              {classItem.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <GraduationCap className="w-3 h-3 mr-1" />
                              <span>Class ID -</span>
                            </div>
                            {classItem.code && (
                              <div className="flex items-center">
                                <span className="px-1.5 py-0.5 bg-secondary/20 rounded text-secondary-foreground">
                                  {classItem.code}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 h-full overflow-hidden">
        {selectedClass && <SectionList selectedClass={selectedClass} />}
      </div>
    </div>
  );
}
