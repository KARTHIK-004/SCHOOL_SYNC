import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function ParentDirectory() {
  return (
    <div>
      <h2>ParentDirectory</h2>
      <Button>
        <Link to="/dashboard/parents/create">Create Parent</Link>
      </Button>
    </div>
  );
}
