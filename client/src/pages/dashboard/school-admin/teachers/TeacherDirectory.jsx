import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function TeacherDirectory() {
  return (
    <div>
      <h2>TeacherDirectory</h2>
      <Button>
        <Link to="/dashboard/teachers/create">Create Parent</Link>
      </Button>
    </div>
  );
}
