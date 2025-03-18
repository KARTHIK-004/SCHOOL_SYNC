import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, Pencil, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function DepartmentList(
  departments,
  selectedDepartment,
  onSelect,
  isLoading
) {
  if (isLoading) {
    return (
      <div className="space-y-2 px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (departments.length === 0) {
    return <div className="flex justify-center p-4">No departments found</div>;
  }
  return (
    <div>
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
            <>
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
            </>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
