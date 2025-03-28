import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WelcomeBanner({ schoolData }) {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (schoolData) {
      setSchool(schoolData);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [schoolData]);

  return (
    <Card className="border-none shadow-sm bg-primary text-primary-foreground w-full">
      <CardContent className="flex items-center gap-4 p-6">
        {loading ? (
          // Skeleton loading state
          <>
            <Skeleton className="rounded-full bg-primary-foreground/20" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64 bg-primary-foreground/20" />
              <Skeleton className="h-4 w-40 bg-primary-foreground/20" />
            </div>
          </>
        ) : (
          <>
            <Avatar className="h-12 w-12 bg-primary-foreground/20 text-secondary">
              <AvatarImage
                src={school?.data.logo}
                alt={school?.data.adminName}
              />
              <AvatarFallback className="bg-primary-foreground/20">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {school?.data.adminName}!
              </h1>
              <p className="text-secondary/90">
                ADMIN at {school?.data.schoolName}
              </p>
            </div>

            <div className="space-y-2 ml-auto">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary/90" />
                <div className="lg:flex gap-2">
                  <p className="text-sm font-medium">Email:</p>
                  <p className="text-sm text-secondary/90 break-all">
                    {school.data.contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary/90" />
                <div className="lg:flex gap-2">
                  <p className="text-sm font-medium">Phone:</p>
                  <p className="text-sm text-secondary/90">
                    {school.data.phone}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
