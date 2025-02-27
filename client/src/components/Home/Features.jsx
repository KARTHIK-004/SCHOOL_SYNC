import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SectionHeader from "../ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Manage student records, attendance, and performance with a dashboard.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Calendar,
    title: "Scheduling System",
    description:
      "Create and manage class schedules, events, and academic calendars effortlessly.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Assessment Tracking",
    description:
      "Create, distribute, and grade assessments while tracking student progress over time.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    title: "Communication Tools",
    description:
      "Connect teachers, parents, and students with real-time messaging and announcements.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description:
      "Gain insights with comprehensive analytics and generate detailed reports.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data Management",
    description:
      "Keep sensitive data protected with advanced security measures and role-based access.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    description:
      "Monitor and manage attendance with automated tracking and notification systems.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Centralize educational materials and provide easy access to learning resources.",
    color: "bg-primary/10 text-primary",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-10 sm:py-16 md:py-20 bg-background px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            logo="📖 "
            title="Core Features"
            heading="Everything You Need to Run Your School Efficiently"
            description="Designed with educators in mind, SchoolSync provides a comprehensive
            suite of tools to streamline operations and enhance learning."
          />
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-left">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-3 text-base sm:text-lg md:text-xl font-semibold">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex-shrink-0">
                    <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-muted-foreground text-sm sm:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
