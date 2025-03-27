import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  Phone,
  Users,
  Calendar,
  MapPin,
  Flag,
  Book,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ActionColumn from "@/components/DataTable/TableColumns/ActionColumn";
import { getStudentById } from "@/utils/studentAPI";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getParentById } from "@/utils/parentAPI";
import { getClassById } from "@/utils/classAPI";
import { getSectionById } from "@/utils/sectionAPI";

const StudentProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const response = await getStudentById(id);
        const studentData = response.data;

        // Fetch additional details for SINGLE student
        const [parentRes, classRes, sectionRes] = await Promise.all([
          getParentById(studentData.parentId),
          getClassById(studentData.classId),
          getSectionById(studentData.sectionId),
        ]);

        setStudent({
          ...studentData,
          parentName: `${parentRes.data.firstName} ${parentRes.data.lastName}`,
          parentEmail: parentRes.data.email,
          parentPhone: parentRes.data.phone,
          className: classRes?.data?.className || "N/A",
          sectionName: sectionRes?.data?.sectionName || "N/A",
        });
      } catch (error) {
        console.error("Error fetching student:", error);
        toast({
          title: "Error",
          description: "Failed to fetch student profile.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id, toast]);
  console.log(student);

  if (isLoading) return <StudentProfileSkeleton />;

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Student not found</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          The student you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="default">
          <Link to="/dashboard/students">Back to Students List</Link>
        </Button>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    gender,
    bloodGroup,
    admissionDate,
    birthCertificateNo,
    regNo,
    className,
    sectionName,
    parentName,
    parentEmail,
    parentPhone,
    parentId,
    religion,
    nationality,
    address,
    imageUrl,
  } = student;

  const formattedAdmissionDate = admissionDate
    ? format(new Date(admissionDate), "PPP")
    : "N/A";
  const formattedBirthDate = birthDate
    ? format(new Date(birthDate), "PPP")
    : "N/A";

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild className="shrink-0">
              <Link to="/dashboard/students">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl md:text-2xl font-bold truncate">
              Student Profile
            </h1>
          </div>
          <ActionColumn
            model="student"
            editEndpoint={`/dashboard/students/edit/${id}`}
            id={id}
          />
        </div>

        {/* Profile Card */}
        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-primary/10 shadow-sm">
                <AvatarImage src={imageUrl} alt={`${firstName} ${lastName}`} />
                <AvatarFallback className="text-lg">
                  {firstName?.charAt(0)}
                  {lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold">
                  {firstName} {lastName}
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Book className="h-3 w-3" />
                    {className}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Flag className="h-3 w-3" />
                    {nationality}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Admitted on {formattedAdmissionDate}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
              </TabsList>

              <TabsContent
                value="personal"
                className="space-y-6 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Birth Date:
                      </span>
                      <span className="text-sm font-medium">
                        {formattedBirthDate}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Gender:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {gender}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Blood Group:
                      </span>
                      <span className="text-sm font-medium">{bloodGroup}</span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Religion:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {religion}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Nationality:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {nationality}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Parent Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Parent Name:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {parentName}
                        </span>
                      </div>

                      <span className="font-medium text-sm text-muted-foreground">
                        Parent Email:
                      </span>
                      <span className="text-sm font-medium">{parentEmail}</span>
                      <span className="font-medium text-sm text-muted-foreground">
                        Parent Contact:
                      </span>
                      <span className="text-sm font-medium">
                        {parentPhone}
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <Link
                            to={`/dashboard/parents/${parentId}`}
                            title="View parent"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="contact"
                className="space-y-6 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Details
                    </h3>

                    <div className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium break-all">
                            {email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="text-sm font-medium">
                            {phone || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address Information
                    </h3>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2.5 rounded-full mt-0.5">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="text-sm font-medium">
                          {address || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="academic"
                className="space-y-6 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Academic Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Registration No:
                      </span>
                      <span className="text-sm font-medium">{regNo}</span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Class:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {className}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Section:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {sectionName}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Admission Date:
                      </span>
                      <span className="text-sm font-medium">
                        {formattedAdmissionDate}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Birth Certificate:
                      </span>
                      <span className="text-sm font-medium">
                        {birthCertificateNo}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

// Loading skeleton
const StudentProfileSkeleton = () => (
  <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-8 w-40" />
      </div>
      <Skeleton className="h-9 w-9 rounded-md" />
    </div>

    <Card>
      <CardHeader className="bg-muted/30">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
          <div className="flex flex-col items-center md:items-start">
            <Skeleton className="h-8 w-48 mb-2" />
            <div className="flex flex-wrap gap-2 mt-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Skeleton className="h-10 w-64 mx-auto mb-6 rounded-md" />
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StudentProfile;
