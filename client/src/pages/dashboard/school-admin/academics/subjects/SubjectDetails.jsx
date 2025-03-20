import {
  Plus,
  BookOpen,
  Calendar,
  ClipboardList,
  CheckCircle,
  ListFilter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function SubjectDetails({ selectedSubject, isLoading }) {
  if (!selectedSubject) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-muted-foreground">
          {isLoading ? "Loading subjects..." : "No subject selected"}
        </p>
        {!isLoading && (
          <Button asChild>
            <Link to="/dashboard/academics/subjects/create">
              Create a new subject
            </Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <header className="border-b bg-background">
        <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold">
              {selectedSubject.subjectName}
            </h1>
            <Breadcrumb className="hidden sm:block lg:block md:hidden mt-1">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/academics/subjects">
                    Subjects
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedSubject.subjectName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Button size="sm" asChild aria-label="Add new subject">
            <Link to="/dashboard/academics/subjects/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Link>
          </Button>
        </div>
      </header>
      <ScrollArea className="md:h-[calc(100vh-9rem)]">
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-8 w-32" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <>
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Subject Code
                        </p>
                        <h2 className="text-2xl font-bold uppercase">
                          {selectedSubject.subjectCode}
                        </h2>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedSubject.subjectName}
                        </p>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Category
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold uppercase">
                          {selectedSubject.departmentCategory}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {selectedSubject.courseType}
                        </p>
                      </div>
                      <ListFilter className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-muted-foreground">
                          Marks
                        </p>
                        <h2 className="text-lg md:text-xl font-medium">
                          Passing Mark {selectedSubject.passingMark}%
                        </h2>
                      </div>
                      <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              [1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          Department:
                        </span>
                        <span className="font-medium">
                          {selectedSubject.department.departmentName}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedSubject.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          Last Updated:
                        </span>
                        <span className="font-medium">
                          {new Date(
                            selectedSubject.updatedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">Optional:</span>
                        <Badge
                          variant={
                            selectedSubject.isOptional ? "default" : "outline"
                          }
                          className="w-16 justify-center"
                        >
                          {selectedSubject.isOptional ? "Yes" : "No"}
                        </Badge>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          Has Theory:
                        </span>
                        <Badge
                          variant={
                            selectedSubject.hasTheory ? "default" : "outline"
                          }
                          className="w-16 justify-center"
                        >
                          {selectedSubject.hasTheory ? "Yes" : "No"}
                        </Badge>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          Has Practical:
                        </span>
                        <Badge
                          variant={
                            selectedSubject.hasPractical ? "default" : "outline"
                          }
                          className="w-16 justify-center"
                        >
                          {selectedSubject.hasPractical ? "Yes" : "No"}
                        </Badge>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          Lab Required:
                        </span>
                        <Badge
                          variant={
                            selectedSubject.hasLabs ? "default" : "outline"
                          }
                          className="w-16 justify-center"
                        >
                          {selectedSubject.hasLabs ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </ScrollArea>
    </>
  );
}
