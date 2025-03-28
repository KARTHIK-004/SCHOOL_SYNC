import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getMySchool, getSchoolById } from "@/utils/schoolAPI";
import WelcomeBanner from "@/components/Dashboard/SchoolAdmin/WelcomeBanner";
import StatCard from "@/components/Dashboard/SchoolAdmin/StatCard";
import RecentActivities from "@/components/Dashboard/SchoolAdmin/RecentActivities";
import UpcomingEvents from "@/components/Dashboard/SchoolAdmin/UpcomingEvents";
import QuickActionButton from "@/components/Dashboard/SchoolAdmin/QuickActionButton";

export default function SchoolAdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const [schoolStats, setSchoolStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    classes: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const checkSchoolRegistration = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);

        if (!userData.school) {
          toast({
            title: "School Registration Required",
            description: "Please register your school to continue.",
          });
          navigate("/school-onboard");
          return;
        }

        const schoolData = await getMySchool(userData.id);
        setSchool(schoolData);

        // Set actual stats from your API when available
        setSchoolStats({
          students: 0,
          teachers: 0,
          parents: 0,
          classes: 0,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Authentication Error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
        navigate("/sign-in");
      }
    };

    checkSchoolRegistration();
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
    <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        {/* School Info Card */}
        <WelcomeBanner schoolData={school} />
        <StatCard schoolStats={schoolStats} />

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 space-y-4">
            <RecentActivities activities={recentActivities} />
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton
                title="Add New Student"
                icon="user-plus"
                onClick={() => navigate("/students/new")}
              />
              <QuickActionButton
                title="Create Announcement"
                icon="megaphone"
                onClick={() => navigate("dashboard/announcements/new")}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
