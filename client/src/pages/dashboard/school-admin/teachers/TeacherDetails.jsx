import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  Phone,
  User,
  Calendar,
  AlertCircle,
  Briefcase,
  BookOpen,
  GraduationCap,
  FileText,
  School,
  Clock,
  Award,
  Building,
  Users,
  FileClock,
  Heart,
  CreditCard,
  BadgeCheck,
  UserPlus,
  Clipboard,
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ActionColumn from "@/components/DataTable/TableColumns/ActionColumn";
import { getTeacherById } from "@/utils/teacherAPI";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const TeacherProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState({});
  const [departmentInfo, setDepartmentInfo] = useState({});

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setIsLoading(true);
        const response = await getTeacherById(id);
        setTeacher(response.data);
        if (response.data) {
          setSubjects({
            main: { name: "Mathematics", _id: response.data.mainSubject },
            additional: {
              name: "Physics",
              _id: response.data.additionalSubject,
            },
          });

          setDepartmentInfo({
            name: "Science Department",
            _id: response.data.department,
          });
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
        toast({
          title: "Error",
          description: "Failed to fetch teacher profile.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id, toast]);

  if (isLoading) return <TeacherProfileSkeleton />;

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <User className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Teacher not found</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          The teacher you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="default">
          <Link to="/dashboard/teachers">Back to Teachers List</Link>
        </Button>
      </div>
    );
  }

  const {
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
    emergencyContact,
    employeeId,
    contractType,
    qualification,
    educationLevel,
    teachingLevel,
    nationality,
    address,
    imageUrl,
    createdAt,
    mainSubject,
    additionalSubject,
    dateOfBirth,
    experienceYears,
    skills,
    certifications,
    previousExperience,
    salaryDetails,
    performanceRating,
  } = teacher;

  const formattedDate = createdAt ? format(new Date(createdAt), "PPP") : "N/A";

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild className="shrink-0">
              <Link to="/dashboard/teachers">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl md:text-2xl font-bold truncate">
              Teacher Profile
            </h1>
          </div>
          <ActionColumn
            model="teacher"
            editEndpoint={`/dashboard/teachers/edit/${id}`}
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
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold capitalize">
                    {teacher.title && `${teacher.title}. `}
                    {teacher.firstName} {teacher.lastName}
                  </h1>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {/* <Badge>{department?.name || "Department"}</Badge> */}
                    <Badge variant="outline">{teachingLevel}</Badge>
                    <Badge variant="secondary">ID: {employeeId}</Badge>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  {subjects.main.name || "Subject"} Teacher
                  {subjects.additional.name && ` • ${subjects.additional.name}`}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
              </TabsList>

              <TabsContent
                value="personal"
                className="space-y-6 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Full Name:
                      </span>
                      <span className="text-sm font-medium">
                        {title && `${title}. `}
                        {firstName} {lastName}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Nationality:
                      </span>
                      <span className="text-sm font-medium">
                        {nationality || "N/A"}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Address:
                      </span>
                      <span className="text-sm font-medium">
                        {address || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Information
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
                            {phoneNumber || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <AlertCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Emergency Contact
                          </p>
                          <p className="text-sm font-medium">
                            {emergencyContact || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      System Information
                    </h3>

                    <div className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Account Created
                          </p>
                          <p className="text-sm font-medium">{formattedDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Employee ID
                          </p>
                          <p className="text-sm font-medium">
                            {employeeId || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <Building className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            School ID
                          </p>
                          <p className="text-sm font-medium">
                            {teacher.schoolId || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="professional"
                className="space-y-6 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Qualification & Education
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Qualification:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {qualification}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Education Level:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {educationLevel}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Teaching Level:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {teachingLevel}
                      </span>

                      {certifications && certifications.length > 0 && (
                        <>
                          <span className="font-medium text-sm text-muted-foreground">
                            Certifications:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {certifications.map((cert, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Award className="h-3 w-3" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Employment Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Department:
                      </span>
                      <span className="text-sm font-medium">
                        {departmentInfo.name}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Contract Type:
                      </span>
                      <span className="text-sm font-medium">
                        {contractType}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Skills & Performance
                    </h3>

                    {skills && skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <BadgeCheck className="h-3 w-3" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No skills information available
                      </p>
                    )}

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Performance Rating
                      </h4>
                      {performanceRating ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${performanceRating * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {performanceRating}/5
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No performance rating available
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Salary & Benefits
                    </h3>

                    {salaryDetails ? (
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                        <span className="font-medium text-sm text-muted-foreground">
                          Basic Salary:
                        </span>
                        <span className="text-sm font-medium">
                          {salaryDetails.basic
                            ? `$${salaryDetails.basic.toLocaleString()}`
                            : "N/A"}
                        </span>

                        <span className="font-medium text-sm text-muted-foreground">
                          Allowances:
                        </span>
                        <span className="text-sm font-medium">
                          {salaryDetails.allowances
                            ? `$${salaryDetails.allowances.toLocaleString()}`
                            : "N/A"}
                        </span>

                        <span className="font-medium text-sm text-muted-foreground">
                          Total:
                        </span>
                        <span className="text-sm font-medium">
                          {salaryDetails.basic && salaryDetails.allowances
                            ? `$${(
                                salaryDetails.basic + salaryDetails.allowances
                              ).toLocaleString()}`
                            : "N/A"}
                        </span>

                        <span className="font-medium text-sm text-muted-foreground">
                          Payment Method:
                        </span>
                        <span className="text-sm font-medium">
                          {salaryDetails.paymentMethod || "N/A"}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No salary information available
                      </p>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                    <Clipboard className="h-4 w-4" />
                    Previous Experience
                  </h3>

                  {previousExperience && previousExperience.length > 0 ? (
                    <div className="space-y-4">
                      {previousExperience.map((exp, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{exp.position}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {exp.organization}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Calendar className="h-3 w-3" />
                                {exp.years} years
                              </Badge>
                            </div>
                            <p className="text-sm mt-2">
                              {exp.description || "No description available"}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-muted/20 p-4 rounded-md">
                      <p className="text-sm text-center text-muted-foreground">
                        No previous experience records found
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="subjects"
                className="space-y-4 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-3">
                      <h3 className="font-medium text-center">Main Subject</h3>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-3 rounded-full mb-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="text-lg font-medium">
                          {subjects.main.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Subject ID: {teacher.mainSubject}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          asChild
                        >
                          <Link to={`/dashboard/academics/subjects`}>
                            View Subject Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {teacher.additionalSubject && (
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-muted/30 pb-3">
                        <h3 className="font-medium text-center">
                          Additional Subject
                        </h3>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary/10 p-3 rounded-full mb-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="text-lg font-medium">
                            {subjects.additional.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Subject ID: {teacher.additionalSubject}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            asChild
                          >
                            <Link to={`/dashboard/academics/subjects`}>
                              View Subject Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {!teacher.additionalSubject && (
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="bg-muted/40 p-4 rounded-full mb-4">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium">
                            No additional subject
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 max-w-md">
                            This teacher doesn't have an additional subject
                            assigned.
                          </p>
                          <Button variant="outline" className="mt-4" asChild>
                            <Link to={`/dashboard/teachers/edit/${id}`}>
                              Assign Additional Subject
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="overflow-hidden md:col-span-2">
                    <CardHeader className="bg-muted/30 pb-3">
                      <h3 className="font-medium">Department Information</h3>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <School className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{departmentInfo.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Department ID: {teacher.department}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/dashboard/academics/departments`}>
                              View Department
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
const TeacherProfileSkeleton = () => (
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

export default TeacherProfile;
