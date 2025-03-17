import { useEffect, useState } from "react";
import {
  Building,
  Pencil,
  Plus,
  FileText,
  ListFilter,
  Trash,
  Users,
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
import { getAllDepartments } from "@/utils/department";
import { getCurrentUser } from "@/utils/authAPI";
import { useToast } from "@/hooks/use-toast";

export default function DepartmentManagement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllDepartments(userData);
        const departments = response.data.data;
        setDepartmentsList(departments);
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
        setDepartmentsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter departments based on search query
  const filteredDepartments = departmentsList.filter((dept) => {
    const name = dept.departmentName || dept.name || "";
    const code = dept.departmentCode || dept.code || "";
    const searchLower = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(searchLower) ||
      code.toLowerCase().includes(searchLower)
    );
  });

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
            <SheetTitle>Department Navigation</SheetTitle>
            <SheetDescription>Browse and manage departments</SheetDescription>
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
                <Building />
                <h2 className="text-xl font-semibold">Departments</h2>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/academics/departments/create">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Search */}
            <div className="my-3">
              <Input
                type="search"
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Department list */}
            <ScrollArea className="sm:h-full md:h-[calc(100vh-13rem)]">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <p>Loading departments...</p>
                </div>
              ) : filteredDepartments.length > 0 ? (
                <ul className="space-y-1">
                  {filteredDepartments.map((department, index) => (
                    <li key={index}>
                      <div className="relative group">
                        <div
                          className={`block p-3 rounded-lg transition ${
                            selectedDepartment.id === department.id
                              ? "bg-primary/10"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleSelectDepartment(department)}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-base font-medium truncate">
                                {department.departmentName}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Building className="w-3 h-3 mr-1" />
                                <span>Department ID -</span>
                              </div>
                              {department.departmentCode && (
                                <div className="flex items-center">
                                  <span className="px-1.5 py-0.5 bg-secondary/20 rounded text-secondary-foreground">
                                    {department.departmentCode}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Link
                              to={`/dashboard/academics/departments/edit/${department._id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center p-4">
                  <p>No departments found</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 h-full overflow-hidden">
        {selectedDepartment ? (
          <>
            {/* Header */}
            <header className="border-b bg-background">
              <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                  <h1 className="text-2xl font-semibold">
                    {selectedDepartment.departmentName}{" "}
                  </h1>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/academics/departments">
                          Department
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {selectedDepartment.departmentName}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                {/* Add Department Button */}
                <Link to={`/dashboard/academics/departments/create`}>
                  <Button className="w-full sm:w-auto justify-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
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
                            Department Code
                          </p>
                          <h2 className="text-2xl font-bold uppercase">
                            {selectedDepartment.departmentCode}
                          </h2>
                          <p className="text-sm text-muted-foreground capitalize">
                            {selectedDepartment.departmentName}
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
                          <h2 className="text-2xl font-bold uppercase">
                            {selectedDepartment.departmentCategory}
                          </h2>
                          <p className="text-sm text-muted-foreground capitalize">
                            {selectedDepartment.departmentType}
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
                            Staff & Students
                          </p>
                          <h2 className="text-lg md:text-xl font-medium">
                            {selectedDepartment.staffCount || 0} Staff,{" "}
                            {selectedDepartment.studentCount || 0} Students
                          </h2>
                        </div>
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Department details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Department Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Head of Department:
                          </span>
                          <span className="font-medium">
                            {selectedDepartment.headOfDepartment ||
                              "Not assigned"}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Faculty:
                          </span>
                          <span className="font-medium capitalize">
                            {selectedDepartment.departmentFaculty}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Created:
                          </span>
                          <span className="font-medium">
                            {selectedDepartment.createdAt
                              ? new Date(
                                  selectedDepartment.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Last Updated:
                          </span>
                          <span className="font-medium">
                            {selectedDepartment.updatedAt
                              ? new Date(
                                  selectedDepartment.updatedAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Department Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">Active:</span>
                          <Badge
                            variant={
                              selectedDepartment.status === "active" ||
                              selectedDepartment.isActive
                                ? "default"
                                : "outline"
                            }
                            className="w-16 justify-center"
                          >
                            {selectedDepartment.status === "active" ||
                            selectedDepartment.isActive
                              ? "Yes"
                              : "No"}
                          </Badge>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Offers Courses:
                          </span>
                          <Badge
                            variant={
                              selectedDepartment.offersCourses
                                ? "default"
                                : "outline"
                            }
                            className="w-16 justify-center"
                          >
                            {selectedDepartment.offersCourses ? "Yes" : "No"}
                          </Badge>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Has Labs:
                          </span>
                          <Badge
                            variant={
                              selectedDepartment.hasLabs ? "default" : "outline"
                            }
                            className="w-16 justify-center"
                          >
                            {selectedDepartment.hasLabs ? "Yes" : "No"}
                          </Badge>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            Staff Count:
                          </span>
                          <span className="font-medium">
                            {selectedDepartment.staffCount || 0}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">Student</span>
                          <span className="font-medium">
                            {selectedDepartment.studentCount || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </main>
            </ScrollArea>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              {isLoading
                ? "Loading departments..."
                : "Select a department to view details"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
