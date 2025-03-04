import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pencil,
  Plus,
  Trash,
  Users,
  Mail,
  Phone,
  UserCircle,
} from "lucide-react";

export default function StudentList() {
  const { sectionId } = useParams();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionInfo, setSectionInfo] = useState(null);

  useEffect(() => {
    // Mock section data
    const mockSectionInfo = {
      id: sectionId,
      name: "Section A",
      className: "Class 5",
      classId: 5,
    };
    setSectionInfo(mockSectionInfo);

    // Mock student data
    const mockStudents = [
      {
        id: 1,
        name: "John Doe",
        rollNumber: "S001",
        gender: "Male",
        contactNumber: "123-456-7890",
        email: "john.doe@example.com",
      },
      // ... existing student data ...
    ];
    setStudents(mockStudents);
  }, [sectionId]);

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 h-full overflow-hidden">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold">
              {sectionInfo ? `Students in ${sectionInfo.name}` : "Students"}
            </h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/academics/classes">
                    Classes
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/dashboard/academics/classes/${sectionInfo?.classId}/sections`}
                  >
                    {sectionInfo?.className}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{sectionInfo?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Add Student Button */}
          <Link to={`/dashboard/students/create`}>
            <Button className="w-full sm:w-auto justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </Link>
        </div>
      </header>

      {/* Search and Stats */}
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <Input
            type="search"
            placeholder="Search students by name, roll number, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <div className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </div>
      </div>

      {/* Students Cards */}
      <ScrollArea className="h-[calc(100vh-14rem)]">
        <div className="p-4">
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <Card
                  key={student.id}
                  className="group overflow-hidden border shadow-sm hover:shadow transition-shadow duration-200"
                >
                  <CardContent className="p-0">
                    <div className="bg-primary/5 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold border border-primary/20">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-base">
                              {student.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                {student.rollNumber}
                              </span>
                              <span>•</span>
                              <span>{student.gender}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">
                          {student.contactNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <UserCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Students Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or add a new student.
              </p>
              <Link to={`/dashboard/students/create`}>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </Link>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
