import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Plus, Trash, Users } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { getSectionsByClass } from "@/utils/sectionAPI";
import { getTeacherById } from "@/utils/teacherAPI";
import { useToast } from "@/hooks/use-toast";

export default function SectionList({ selectedClass }) {
  const { toast } = useToast();
  const [sections, setSections] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const classId = selectedClass?._id;

    if (!classId) {
      setSections([]);
      setTeacher(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Sections
        const sectionResponse = await getSectionsByClass(classId);
        const rawSections = sectionResponse.data || [];

        // Fetch teachers for all sections
        const sectionsWithTeachers = await Promise.all(
          rawSections.map(async (section) => {
            if (section.teacherId) {
              try {
                const teacherResponse = await getTeacherById(section.teacherId);
                return {
                  ...section,
                  teacher: teacherResponse.data,
                };
              } catch (error) {
                console.error("Error fetching teacher:", error);
                toast({
                  title: "Error fetching teacher",
                  description:
                    "An error occurred while fetching teacher details.",
                  variant: "destructive",
                });
              }
            }
            return section;
          })
        );

        setSections(sectionsWithTeachers);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error fetching data",
          description: "An error occurred while fetching data.",
          variant: "destructive",
        });
        setSections(selectedClass.sections || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedClass]);

  console.log(sections);

  return (
    <div className="flex-1 h-full overflow-hidden">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold sm:block md:hidden lg:block">
              Sections in {selectedClass?.className}
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
                  <BreadcrumbPage>{selectedClass?.className}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Add Section Button */}
          <Link to={`/dashboard/academics/classes/sections/create`}>
            <Button className="w-full sm:w-auto justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </Link>
        </div>
      </header>

      {/* Section Cards */}
      <ScrollArea className="md:h-[calc(100vh-9rem)]">
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {sections.length > 0 ? (
              sections.map((section) => (
                <Card key={section._id} className="group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {section.sectionName}
                      </h3>
                      <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/dashboard/academics/classes/sections/edit/${section._id}`}
                        >
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Code:</span>
                        <span className="font-medium">
                          {section.sectionCode}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Teacher:</span>
                        <span className="font-medium capitalize">
                          {section.teacher?.firstName || "N/A"}{" "}
                          {section.teacher?.lastName || ""}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-medium">
                          {section.students?.length || 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link
                      to={`/dashboard/academics/classes/sections/${section._id}/students`}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        View Students
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-4 md:p-32 text-center">
                <div className="max-w-md">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
                    No sections available
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    There are no sections created for this class yet.
                  </p>
                  <Link to="/dashboard/academics/classes/sections/create">
                    <Button className="mt-2" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
