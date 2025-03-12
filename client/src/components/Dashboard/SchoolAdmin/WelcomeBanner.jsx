import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMySchool } from "@/utils/schoolAPI";
import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeBanner() {
  const { toast } = useToast();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await getMySchool();
        setSchool(response.data.school);
      } catch (error) {
        console.error("Error fetching school:", error.response?.data);

        toast({
          title: "Error",
          description: "Failed to load school information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSchool();
  }, []);

  return (
    <Card className="border-none shadow-sm bg-primary text-primary-foreground w-full">
      <CardContent className="flex items-center gap-4 p-6">
        {loading ? (
          // Skeleton loading state
          <>
            <Skeleton className="h-12 w-12 rounded-full bg-primary-foreground/20" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64 bg-primary-foreground/20" />
              <Skeleton className="h-4 w-40 bg-primary-foreground/20" />
            </div>
          </>
        ) : (
          // Loaded content
          <>
            <Avatar className="h-12 w-12 bg-primary-foreground/20 text-secondary">
              <AvatarImage src={school?.logo} alt={school?.adminName} />
              <AvatarFallback className="bg-primary-foreground/20">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {school?.adminName}!
              </h1>
              <p className="text-secondary/90">ADMIN at {school?.schoolName}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
