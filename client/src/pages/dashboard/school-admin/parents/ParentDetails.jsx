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
  MessageCircle,
  Briefcase,
  BookOpen,
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
import { getParentById } from "@/utils/parentAPI";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const ParentProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [parent, setParent] = useState(null);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        setIsLoading(true);
        const response = await getParentById(id);
        setParent(response.data);
      } catch (error) {
        console.error("Error fetching parent:", error);
        toast({
          title: "Error",
          description: "Failed to fetch parent profile.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchParent();
    }
  }, [id, toast]);

  if (isLoading) return <ParentProfileSkeleton />;

  if (!parent) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Parent not found</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          The parent you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="default">
          <Link to="/dashboard/parents">Back to Parents List</Link>
        </Button>
      </div>
    );
  }

  const {
    title,
    firstName,
    lastName,
    email,
    phone,
    whatsapp,
    relationship,
    nationalId,
    contactMethod,
    educationLevel,
    occupation,
    incomeRange,
    religion,
    nationality,
    address,
    imageUrl,
    children = [],
    createdAt,
  } = parent;

  const formattedDate = createdAt ? format(new Date(createdAt), "PPP") : "N/A";

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild className="shrink-0">
              <Link to="/dashboard/parents">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl md:text-2xl font-bold truncate">
              Parent Profile
            </h1>
          </div>
          <ActionColumn
            model="parent"
            editEndpoint={`/dashboard/parents/edit/${id}`}
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
                  {title && `${title}. `}
                  {firstName} {lastName}
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {relationship}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Flag className="h-3 w-3" />
                    {nationality}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Added on {formattedDate}
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
                <TabsTrigger value="children">Children</TabsTrigger>
              </TabsList>

              <TabsContent
                value="personal"
                className="space-y-6 animate-in fade-in-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        National ID:
                      </span>
                      <span className="text-sm font-medium">
                        {nationalId || "N/A"}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Religion:
                      </span>
                      <span className="text-sm font-medium">
                        {religion || "N/A"}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Nationality:
                      </span>
                      <span className="text-sm font-medium">
                        {nationality || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Professional Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-y-4">
                      <span className="font-medium text-sm text-muted-foreground">
                        Education:
                      </span>
                      <span className="text-sm font-medium">
                        {educationLevel || "N/A"}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Occupation:
                      </span>
                      <span className="text-sm font-medium">
                        {occupation || "N/A"}
                      </span>

                      <span className="font-medium text-sm text-muted-foreground">
                        Income Range:
                      </span>
                      <span className="text-sm font-medium">
                        {incomeRange || "N/A"}
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

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <MessageCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            WhatsApp
                          </p>
                          <p className="text-sm font-medium">
                            {whatsapp || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Additional Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full mt-0.5">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Address
                          </p>
                          <p className="text-sm font-medium">
                            {address || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5">
                          Preferred Contact Method
                        </p>
                        <Badge variant="secondary" className="capitalize">
                          {contactMethod || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="children"
                className="space-y-4 animate-in fade-in-50"
              >
                {children.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {children.map((child) => (
                      <Card
                        key={child._id}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-0">
                          <div className="flex items-center gap-3 p-4">
                            <Avatar className="h-10 w-10 border border-muted">
                              <AvatarImage
                                src={child.imageUrl}
                                alt={`${child.firstName} ${child.lastName}`}
                              />
                              <AvatarFallback>
                                {child.firstName?.charAt(0)}
                                {child.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {child.firstName} {child.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {child.studentId || "No ID"}
                              </p>
                            </div>
                          </div>
                          <Separator />
                          <div className="p-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <Link to={`/dashboard/students/${child._id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-muted/40 p-4 rounded-full mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">
                      No children registered
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      There are no children associated with this parent.
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/dashboard/students/new">Register a child</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

// Loading skeleton
const ParentProfileSkeleton = () => (
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

export default ParentProfile;
