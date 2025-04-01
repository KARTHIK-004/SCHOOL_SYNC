import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeacherWelcomeBanner({ teacherData }) {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (teacherData) {
      setTeacher(teacherData);
    }
  }, [teacherData]);

  return (
    <Card className="border-none shadow-sm bg-primary text-primary-foreground w-full">
      <CardContent className="flex items-center gap-4 p-6">
        <>
          <Avatar className="h-12 w-12 bg-primary-foreground/20 text-secondary">
            <AvatarImage
              src={teacher?.imageUrl || ""}
              alt={teacher?.firstName || ""}
            />
            <AvatarFallback className="bg-primary-foreground/20">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {teacher?.firstName} {teacher?.lastName}!
            </h1>
            <p className="text-secondary/90">
              {teacher?.departmentName} Teacher, Employee Id -
              {teacher?.employeeId}
            </p>
          </div>

          <div className="space-y-2 ml-auto">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary/90" />
              <div className="lg:flex gap-2">
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm text-secondary/90 break-all">
                  {teacher?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary/90" />
              <div className="lg:flex gap-2">
                <p className="text-sm font-medium">Phone:</p>
                <p className="text-sm text-secondary/90">
                  {teacher?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
