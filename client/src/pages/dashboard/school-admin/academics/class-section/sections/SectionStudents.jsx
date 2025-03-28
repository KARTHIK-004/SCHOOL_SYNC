import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Users,
  Search,
  UserPlus,
  FileDown,
  Filter,
  Loader2,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

// Hooks
import { useToast } from "@/hooks/use-toast";

// API
import { getSectionById } from "@/utils/sectionAPI";
import { getClassById } from "@/utils/classAPI";
import { getParentById } from "@/utils/parentAPI";
import { getAllStudents } from "@/utils/studentAPI";
import { getCurrentUser } from "@/utils/authAPI";

const SectionStudents = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [section, setSection] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchSectionAndStudents = async () => {
      if (!id) return;
      try {
        setIsLoading(true);

        const sectionResponse = await getSectionById(id);
        const sectionData = sectionResponse.data;
        setSection(sectionData);

        const userData = await getCurrentUser();
        const allStudentsResponse = await getAllStudents(userData);
        const allStudents = allStudentsResponse.data || [];

        const sectionStudents = allStudents.filter(
          (student) => student.sectionId === sectionData._id
        );

        setStudents(sectionStudents);
        setFilteredStudents(sectionStudents);
      } catch (error) {
        console.error("Error fetching section details:", error);
        toast({
          title: "Section Data Fetch Error",
          description: "Failed to load section information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionAndStudents();
  }, [id, toast]);

  if (isLoading) {
    return <SectionStudentsSkeleton />;
  }

  console.log(section);

  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Section not found</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          The section you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="default">
          <Link to="/dashboard/academics/classes">Back to Sections</Link>
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        {/* Header with back button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {section.sectionName} Students
              </h1>
              <p className="text-sm text-muted-foreground">
                {section.classId?.className} • Room {section.roomNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" asChild>
              <Link to={`/dashboard/students/create`}>
                <UserPlus className="h-4 w-4 mr-1" />
                Add Students
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        setFilteredStudents(
                          [...students].sort((a, b) =>
                            a.firstName.localeCompare(b.firstName)
                          )
                        )
                      }
                    >
                      Sort by Name (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setFilteredStudents(
                          [...students].sort((a, b) =>
                            b.firstName.localeCompare(a.firstName)
                          )
                        )
                      }
                    >
                      Sort by Name (Z-A)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setFilteredStudents(
                          [...students].sort((a, b) =>
                            a.regNo.localeCompare(b.regNo)
                          )
                        )
                      }
                    >
                      Sort by ID
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Card
                key={student._id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-14 w-14 border border-muted">
                      <AvatarImage
                        src={student.imageUrl}
                        alt={`${student.firstName} ${student.lastName}`}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {student.firstName?.charAt(0)}
                        {student.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-base">
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          ID: {student.regNo}
                        </Badge>
                        {student.gender && (
                          <Badge variant="outline" className="text-xs">
                            {student.gender}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {student.parentId ? 1 : 0} Parent(s)
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/students/${student._id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-muted/10 rounded-lg border border-dashed border-muted">
              <div className="bg-muted/30 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No students found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                {searchQuery
                  ? "No students match your search criteria."
                  : "There are no students assigned to this section yet."}
              </p>
              {!searchQuery && (
                <Button variant="default" className="mt-4" asChild>
                  <Link to={`/dashboard/students/create`}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Students
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

// Loading skeleton
const SectionStudentsSkeleton = () => (
  <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:h-[calc(100vh-4rem)]">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <div>
          <Skeleton className="h-8 w-48 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>

    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 w-80" />
          <div className="flex gap-2 ml-auto">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-px w-full my-4" />
            </CardContent>
          </Card>
        ))}
    </div>
  </div>
);

export default SectionStudents;
