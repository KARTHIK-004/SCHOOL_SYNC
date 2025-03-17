import { useState } from "react";
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

export default function SubjectManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // Sample data
  const [subjects] = useState([
    {
      id: "1",
      name: "History",
      code: "HIST023",
      category: "ELECTIVE",
      categoryType: "THEORY",
      marks: "Passing",
      department: "Logistics",
      created: "November 27th, 2024",
      lastUpdated: "November 27th, 2024",
      slug: "history",
      isActive: true,
      isOptional: false,
      hasTheory: true,
      hasPractical: false,
      labRequired: false,
    },
    {
      id: "2",
      name: "Biology",
      code: "BIO045",
      category: "CORE",
      categoryType: "THEORY & PRACTICAL",
      marks: "Passing: 40%",
      department: "Science",
      created: "October 15th, 2024",
      lastUpdated: "October 20th, 2024",
      slug: "biology",
      isActive: true,
      isOptional: false,
      hasTheory: true,
      hasPractical: true,
      labRequired: true,
    },
    {
      id: "3",
      name: "Mathematics",
      code: "MATH101",
      category: "CORE",
      categoryType: "THEORY",
      marks: "Passing: 35%",
      department: "Mathematics",
      created: " 5th, 2024",
      lastUpdated: " 10th, 2024",
      slug: "mathematics",
      isActive: true,
      isOptional: false,
      hasTheory: true,
      hasPractical: false,
      labRequired: false,
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
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
            <SheetTitle>Subject Navigation</SheetTitle>
            <SheetDescription>Browse and manage subject</SheetDescription>
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
                <Book />
                <h2 className="text-xl font-semibold">Subjects</h2>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/academics/subjects/create">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Search */}
            <div className="my-3">
              <Input
                type="search"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Subject list */}
            <ScrollArea className="sm:h-full md:h-[calc(100vh-13rem)]">
              <ul className="space-y-1">
                {subjects.map((subject) => (
                  <li key={subject.id}>
                    <div className="relative group">
                      <div
                        className={`block p-3 rounded-lg transition ${
                          selectedSubject.id === subject.id
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleSelectSubject(subject)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-medium truncate">
                              {subject.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <BookOpen className="w-3 h-3 mr-1" />
                              <span>Subject ID -</span>
                            </div>
                            {subject.code && (
                              <div className="flex items-center">
                                <span className="px-1.5 py-0.5 bg-secondary/20 rounded text-secondary-foreground">
                                  {subject.code}
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
        {selectedSubject && (
          <>
            {/* Header */}
            <header className="border-b bg-background">
              <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                  <h1 className="text-2xl font-semibold">
                    {selectedSubject.name}{" "}
                  </h1>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/academics/classes">
                          Subject
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{selectedSubject.name}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                {/* Add Section Button */}
                <Link to={`/dashboard/academics/subjects/create`}>
                  <Button className="w-full sm:w-auto justify-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subject
                  </Button>
                </Link>
              </div>
            </header>

            <ScrollArea className="sm:h-full md:h-[calc(100vh-9rem)]">
              <main className="p-4 lg:p-6">
                {/* Stats cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Subject Code
                          </p>
                          <h2 className="text-2xl md:text-3xl font-bold">
                            {selectedSubject.code}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedSubject.name}
                          </p>
                        </div>
                        <FileText className="h-5 w-5 text-muted-foreground" />
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
                          <h2 className="text-2xl md:text-3xl font-bold">
                            {selectedSubject.category}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedSubject.categoryType}
                          </p>
                        </div>
                        <ListFilter className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Marks
                          </p>
                          <h2 className="text-lg md:text-xl font-medium">
                            {selectedSubject.marks}
                          </h2>
                        </div>
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Subject details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            {selectedSubject.department}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Created:
                          </span>
                          <span className="font-medium">
                            {selectedSubject.created}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Last Updated:
                          </span>
                          <span className="font-medium">
                            {selectedSubject.lastUpdated}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">Slug:</span>
                          <span className="font-medium">
                            {selectedSubject.slug}
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
                          <span className="text-muted-foreground">Active:</span>
                          <Badge
                            variant={
                              selectedSubject.isActive ? "default" : "outline"
                            }
                            className="w-16 justify-center"
                          >
                            {selectedSubject.isActive ? "Yes" : "No"}
                          </Badge>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Optional:
                          </span>
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
                              selectedSubject.hasPractical
                                ? "default"
                                : "outline"
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
                              selectedSubject.labRequired
                                ? "default"
                                : "outline"
                            }
                            className="w-16 justify-center"
                          >
                            {selectedSubject.labRequired ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </main>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
