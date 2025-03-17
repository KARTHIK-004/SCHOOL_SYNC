import React from "react";
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
import { useParams, Link } from "react-router-dom";

export default function SectionList({ selectedClass }) {
  const { classId } = useParams();
  const sections = selectedClass?.sections || [];

  return (
    <div className="flex-1 h-full overflow-hidden">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold">
              Sections in {selectedClass?.name}
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
                  <BreadcrumbPage>{selectedClass?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Add Section Button */}
          <Link to={`/dashboard/academics/classes/${classId}/sections/create`}>
            <Button className="w-full sm:w-auto justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </Link>
        </div>
      </header>

      {/* Section Cards */}
      <ScrollArea className="h-[calc(100vh-9rem)]">
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {sections.length > 0 ? (
              sections.map((section) => (
                <Card key={section.id} className="group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                      <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/dashboard/academics/classes/sections/edit/${section.id}`}
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
                        <span className="text-muted-foreground">Teacher:</span>
                        <span className="font-medium">
                          {section.sectionTeacher}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-medium">
                          {section.totalStudents}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Code:</span>
                        <span className="font-medium">{section.code}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link
                      to={`/dashboard/academics/sections/${section.id}/students`}
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
              <div className="col-span-full text-center p-12 text-muted-foreground">
                No sections found for this class. Click "Add Section" to create
                one.
              </div>
            )}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
