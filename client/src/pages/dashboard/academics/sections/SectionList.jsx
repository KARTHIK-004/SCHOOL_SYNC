import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export function SectionList() {
  const { classId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const mockSections = [
      { id: 1, name: "Section A" },
      { id: 2, name: "Section B" },
      { id: 3, name: "Section C" },
    ];
    setSections(mockSections);
  }, [classId]);

  return (
    <div className="flex-1 h-full overflow-hidden">
      <ScrollArea className="h-full">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h1 className="text-2xl font-semibold">
                Sections in Class {classId}
              </h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/classes">
                      Classes
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Class {classId}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Add Section Button */}
            <Link to={`/academics/classes/${classId}/sections/create`}>
              <Button className="w-full sm:w-auto justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </Link>
          </div>
        </header>

        {/* Section Cards */}
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Card key={section.name} className="group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                    <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/dashboard/academics/classes/${classId}/sections/edit/${section.id}`}
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
                  <div className="mt-2 text-sm text-muted-foreground">
                    Class Teacher: Jb web developer
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    40 students
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
