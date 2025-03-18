import { Plus } from "lucide-react";
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

// Skeleton Components
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

export default function DepartmentDetails({ selectedDepartment, isLoading }) {
  if (!selectedDepartment) {
    return (
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
    );
  }

  return (
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
  );
}
