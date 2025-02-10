import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function StudentDirectory() {
  return (
    <div>
      <h2> StudentDirectory</h2>
      <Button>
        <Link to="/dashboard/students/create">Create Student</Link>
      </Button>
    </div>
  );
}
