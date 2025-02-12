import { Button } from "@/components/ui/button";
import { Pencil, Trash, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function ClassList() {
  const classes = [
    { id: 1, name: "Class 1", sections: 3, students: 40 },
    { id: 2, name: "Class 2", sections: 2, students: 35 },
    { id: 3, name: "Class 3", sections: 4, students: 50 },
  ];

  return (
    <div>
      <ul className="space-y-1">
        {classes.map((cls) => (
          <li key={cls.id}>
            <div className="relative group">
              <Link
                to={`/dashboard/academics/classes/${cls.id}/sections`}
                className="block p-3 rounded-lg hover:bg-muted transition"
                onClick={() => setIsSheetOpen(false)}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-base font-medium">{cls.name}</div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {cls.sections} Section
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {cls.students} students
                  </div>
                </div>
              </Link>
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
    </div>
  );
}
