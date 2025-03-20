import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Pencil, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ClassList({
  classes = [],
  selectedClass,
  onSelect,
  isLoading,
  searchQuery = "",
  setSearchQuery,
  isMobile = false,
}) {
  return (
    <div
      className={isMobile ? "" : "hidden md:block w-80 border-r bg-background"}
    >
      <div className="px-4 h-full flex flex-col">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Classes</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Add new class"
          >
            <Link to="/dashboard/academics/classes/create">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <Input
          type="search"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="my-3"
          aria-label="Search classes"
        />
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="space-y-2">
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
          ) : classes.length > 0 ? (
            <ul className="space-y-1">
              {classes.map((classItem) => (
                <li key={classItem._id}>
                  <div className="relative group">
                    <button
                      className={`block w-full text-left p-3 rounded-lg transition ${
                        selectedClass?._id === classItem._id
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => onSelect(classItem)}
                      aria-label={`Select ${classItem.className}`}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium truncate">
                          {classItem.className}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <BookOpen className="w-3 h-3 mr-1" />
                          <span>Class ID -</span>
                          {classItem.classCode && (
                            <span className="px-1.5 py-0.5 bg-secondary/20 rounded text-secondary-foreground">
                              {classItem.classCode}
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
                        aria-label="Edit class"
                      >
                        <Link
                          to={`/dashboard/academics/classes/edit/${classItem._id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete class"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center p-4">No classes found</div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
