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
import { getAllDepartments } from "@/utils/departmentAPI";
import { getCurrentUser } from "@/utils/authAPI";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Reusable Department List Component
const DepartmentList = ({
  departments,
  selectedDepartment,
  onSelect,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2 px-4">
        {[1, 2, 3].map((i) => (
          <DepartmentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (departments.length === 0) {
    return <div className="flex justify-center p-4">No departments found</div>;
  }

  return (
    <ul className="space-y-1">
      {departments.map((department) => (
        <li key={department._id}>
          <div className="relative group">
            <button
              className={`block w-full text-left p-3 rounded-lg transition ${
                selectedDepartment?._id === department._id
                  ? "bg-primary/10"
                  : "hover:bg-muted"
              }`}
              onClick={() => onSelect(department)}
              aria-label={`Select ${department.departmentName}`}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium truncate">
                  {department.departmentName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Building className="w-3 h-3 mr-1" />
                  <span>Dept ID -</span>
                  {department.departmentCode && (
                    <span className="px-1.5 py-0.5 bg-secondary/20 rounded text-secondary-foreground">
                      {department.departmentCode}
                    </span>
                  )}
                </div>
              </div>
            </button>
            <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Edit department"
              >
                <Link
                  to={`/dashboard/academics/departments/edit/${department._id}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete department"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Department Stats Component
const DepartmentStats = ({ department, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Department Code
              </p>
              <h2 className="text-2xl font-bold uppercase">
                {department.departmentCode}
              </h2>
              <p className="text-sm text-muted-foreground capitalize">
                {department.departmentName}
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
                {department.departmentCategory}
              </h2>
              <p className="text-sm text-muted-foreground capitalize">
                {department.departmentType}
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
                {department.staffCount || 0} Staff,{" "}
                {department.studentCount || 0} Students
              </h2>
            </div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Department Details Component
const DepartmentDetails = ({ department, isLoading }) => {
  if (isLoading) return <DetailCardSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Head of Dept:</span>
            <span className="font-medium">
              {department.headOfDepartment || "Not assigned"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Faculty:</span>
            <span className="font-medium capitalize">
              {department.departmentFaculty}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Created:</span>
            <span className="font-medium">
              {department.createdAt
                ? new Date(department.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">
              {department.updatedAt
                ? new Date(department.updatedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Department Properties Component
const DepartmentProperties = ({ department, isLoading }) => {
  if (isLoading) return <DetailCardSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Active:</span>
            <Badge
              variant={department.isActive ? "default" : "outline"}
              className="w-16 justify-center"
            >
              {department.isActive ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Offers Courses:</span>
            <Badge
              variant={department.offersCourses ? "default" : "outline"}
              className="w-16 justify-center"
            >
              {department.offersCourses ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-muted-foreground">Has Labs:</span>
            <Badge
              variant={department.hasLabs ? "default" : "outline"}
              className="w-16 justify-center"
            >
              {department.hasLabs ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton Components
const DepartmentSkeleton = () => (
  <div className="p-3 space-y-2">
    <Skeleton className="h-5 w-3/4" />
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);

const StatCardSkeleton = () => (
  <Card>
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
);

const DetailCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Main Component
export default function DepartmentManagement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setIsSheetOpen(false); // Close sheet on mobile after selection
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
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
        setError("Failed to load departments. Please try again.");
        setDepartmentsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDepartments = departmentsList.filter((dept) => {
    const name = dept.departmentName?.toLowerCase() || "";
    const code = dept.departmentCode?.toLowerCase() || "";
    const searchLower = searchQuery.toLowerCase();
    return name.includes(searchLower) || code.includes(searchLower);
  });

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

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
          <div className="mt-4">
            <Input
              type="search"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
              aria-label="Search departments"
            />
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <DepartmentList
                departments={filteredDepartments}
                selectedDepartment={selectedDepartment}
                onSelect={handleSelectDepartment}
                isLoading={isLoading}
              />
            </ScrollArea>
          </div>
          <Button asChild className="mt-4 w-full">
            <Link to="/dashboard/academics/departments/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Link>
          </Button>
        </SheetContent>
      </Sheet>

      {/* Sidebar */}
      <div className="hidden md:block w-80 border-r bg-background">
        <div className="px-4 h-full flex flex-col">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Departments</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Add new department"
            >
              <Link to="/dashboard/academics/departments/create">
                <Plus className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <Input
            type="search"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="my-3"
            aria-label="Search departments"
          />
          <ScrollArea className="flex-1">
            <DepartmentList
              departments={filteredDepartments}
              selectedDepartment={selectedDepartment}
              onSelect={handleSelectDepartment}
              isLoading={isLoading}
            />
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        {selectedDepartment ? (
          <>
            <header className="border-b bg-background">
              <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                  <h1 className="text-2xl font-semibold">
                    {selectedDepartment.departmentName}
                  </h1>
                  <Breadcrumb className="hidden sm:block mt-1">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/academics/departments">
                          Departments
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
                <Button size="sm" asChild aria-label="Add new department">
                  <Link to="/dashboard/academics/departments/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Link>
                </Button>
              </div>
            </header>
            <ScrollArea className="h-[calc(100vh-9rem)]">
              <main className="p-4 lg:p-6">
                <DepartmentStats
                  department={selectedDepartment}
                  isLoading={isLoading}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DepartmentDetails
                    department={selectedDepartment}
                    isLoading={isLoading}
                  />
                  <DepartmentProperties
                    department={selectedDepartment}
                    isLoading={isLoading}
                  />
                </div>
              </main>
            </ScrollArea>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-muted-foreground">
              {isLoading ? "Loading departments..." : "No department selected"}
            </p>
            {!isLoading && (
              <Button asChild>
                <Link to="/dashboard/academics/departments/create">
                  Create a new department
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
