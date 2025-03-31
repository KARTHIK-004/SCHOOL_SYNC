"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getParentByUserId } from "@/utils/parentAPI";
import { getStudentById } from "@/utils/studentAPI";
import {
  GraduationCap,
  CalendarDays,
  School,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getClassById } from "@/utils/classAPI";

export default function ChildrenDirectory() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [parent, setParent] = useState(null);
  const [childrenData, setChildrenData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getParentData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        const parentResponse = await getParentByUserId(userData.id);
        const parentData = parentResponse.data;
        setParent(parentData);

        if (parentData?.children?.length) {
          const validChildren = await Promise.all(
            parentData.children.map(async (childId) => {
              try {
                const studentResponse = await getStudentById(childId);
                const classResponse = await getClassById(
                  studentResponse.data.classId
                );

                return {
                  ...studentResponse.data,
                  className: classResponse?.data?.className || "N/A",
                };
              } catch (error) {
                console.error("Error fetching child details:", error);
                toast({
                  title: "Error",
                  description: `Failed to load data for student ${childId}: ${error.message}`,
                  variant: "destructive",
                });
                return null;
              }
            })
          );
          setChildrenData(validChildren.filter((child) => child !== null));
        }

        setLoading(false);
      } catch (error) {
        console.error("Main error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    getParentData();
  }, [navigate, toast]);

  // Loading skeleton UI
  if (loading) {
    return (
      <ScrollArea className="md:h-[calc(100vh-4rem)]">
        <div className="flex-1 space-y-4 p-4 md:p-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pb-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  }

  // No children found UI
  if (!childrenData?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="rounded-full bg-muted p-3 mb-4">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Children Found</h2>
          <p className="text-muted-foreground mb-6">
            There are no children associated with your profile. Please contact
            your school administrator to add your children to your account.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Main content with children data
  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Student Directory
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your {childrenData.length}{" "}
              {childrenData.length === 1 ? "child" : "children"}'s academic
              progress
            </p>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {childrenData.map((child) => (
            <Card
              key={child._id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={child.imageUrl}
                      alt={`${child.firstName} ${child.lastName}`}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {child.firstName?.[0]}
                      {child.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {child.firstName} {child.lastName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      ID: {child.regNo}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Class:{" "}
                    {child.classId ? (
                      <Badge variant="outline" className="ml-1 font-normal">
                        {child.className}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground ml-1">
                        Not assigned
                      </span>
                    )}
                  </span>
                </div>

                {child.age && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Age: {child.age} years</span>
                  </div>
                )}

                {child.schoolName && (
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">School: {child.schoolName}</span>
                  </div>
                )}

                {child.academicYear && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Academic Year: {child.academicYear}
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/50 pt-2">
                <Button variant="default" className="w-full" asChild>
                  <Link to={`/dashboard/parent/childrens/${child._id}`}>
                    View Complete Profile
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
