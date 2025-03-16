import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Pencil, Plus, Trash, Users } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ClassList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(null);

  const classes = [
    { id: 1, name: "Class 1", sections: 3, students: 40 },
    { id: 2, name: "Class 2", sections: 2, students: 35 },
    { id: 3, name: "Class 3", sections: 4, students: 50 },
    { id: 4, name: "Class 4", sections: 3, students: 42 },
    { id: 5, name: "Class 5", sections: 2, students: 38 },
    { id: 6, name: "Class 6", sections: 5, students: 55 },
    { id: 7, name: "Class 7", sections: 4, students: 47 },
    { id: 8, name: "Class 8", sections: 3, students: 41 },
    { id: 9, name: "Class 9", sections: 2, students: 36 },
  ];

  const handleClassClick = (classId) => {
    setSelectedClassId(classId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <GraduationCap />
          <h2 className="text-xl font-semibold">Classes</h2>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/academics/classes/create">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="my-3">
        <Input
          type="search"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Class List */}
      <ScrollArea className="h-[calc(100vh-13rem)]">
        <ul className="space-y-1">
          {classes.map((cls) => (
            <li key={cls.id}>
              <div className="relative group">
                <Link
                  to={`/dashboard/academics/classes/${cls.id}/sections`}
                  className={`block p-3 rounded-lg transition ${
                    selectedClassId === cls.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleClassClick(cls.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="text-base font-medium">{cls.name}</div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {cls.sections} Section{cls.sections !== 1 && "s"}
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
      </ScrollArea>
    </div>
  );
}
