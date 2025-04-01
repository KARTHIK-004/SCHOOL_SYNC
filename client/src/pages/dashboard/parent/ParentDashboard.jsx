import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Bell, CalendarDays } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/utils/authAPI";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getParentByUserId } from "@/utils/parentAPI";
import ParentWelcomeBanner from "@/components/Dashboard/Parent/ParentWelcomeBanner";

export default function ParentDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [parent, setParent] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getParentData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        const parentResponse = await getParentByUserId(userData.id);
        const parentData = parentResponse.data || [];
        setParent(parentData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while fetching parent data.",
          variant: "destructive",
        });
      }
    };
    getParentData();
  }, [navigate, toast]);

  if (loading) {
    return (
      <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
        <div className="flex-1 space-y-4 p-4 md:p-8">
          <div className="h-24 bg-primary/20 animate-pulse rounded-lg"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-muted animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <ParentWelcomeBanner parentData={parent} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Children</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {parent.children?.length}
              </div>
              <Button
                variant="link"
                className="px-0 text-xs text-muted-foreground"
              >
                <Link to="/dashboard/parent/children">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                Average attendance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Pending assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Children's Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">John Smith - Grade 10</p>
                    <p className="text-xs text-muted-foreground">
                      Average Grade: A
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">Sarah Smith - Grade 8</p>
                    <p className="text-xs text-muted-foreground">
                      Average Grade: A-
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">
                      Parent-Teacher Meeting
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tomorrow at 2 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">Math Test Results</p>
                    <p className="text-xs text-muted-foreground">
                      Posted 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium">School Event</p>
                    <p className="text-xs text-muted-foreground">
                      Annual Sports Day - Next Week
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
