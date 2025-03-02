import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function StudentDirectory() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">Students Directory</h1>
          <p className="text-muted-foreground">Manage and view all students</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/students/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Link>
        </Button>
      </div>
    </div>
  );
}
