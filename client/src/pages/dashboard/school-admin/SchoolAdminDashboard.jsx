import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/utils/authAPI";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Building, Key, Calendar } from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sign-in");
          return;
        }

        const user = await getCurrentUser();
        setUserData(user);

        // Check if user is a school admin without a schoolId
        if (user.role === "schoolAdmin" && !user.schoolId) {
          navigate("/school-onboard");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If there's an authentication error, redirect to sign in
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    };

    checkUserStatus();
  }, [navigate]);

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-col items-center pb-2">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={userData.profileImage} alt={userData.name} />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl text-center">
              {userData.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              {userData.role}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>

              {userData.schoolId && (
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {userData.schoolName || "School ID: " + userData.schoolId}
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm capitalize">
                  {userData.role} Account
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined: {formatDate(userData.createdAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {userData.name}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your dashboard provides an overview of your account and related
                information.
              </p>

              {userData.role === "schoolAdmin" && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    School Administrator Controls
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    As a school administrator, you have access to manage your
                    school's settings, users, and resources.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional dashboard content can be added here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No recent activity to display.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-md text-sm flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </button>
                  {userData.role === "schoolAdmin" && (
                    <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-md text-sm flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Manage School
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
