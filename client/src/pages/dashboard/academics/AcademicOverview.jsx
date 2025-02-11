import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sections } from "@/lib/formOption";
import {
  Edit,
  GraduationCap,
  Plus,
  PlusCircle,
  Search,
  Slash,
  Trash,
  Users,
} from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AcademicOverview() {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/2 h-full border-r">
        <div className="px-4 h-full flex flex-col">
          <div className="flex items-center justify-between py-4 ">
            <div className="flex items-center gap-2">
              <GraduationCap />
              <h2 className="text-xl font-semibold">Classes</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/academics/classes/new">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search classes..."
              className="pl-9 bg-background"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-full">
            <ul className="space-y-1 ">
              <li>
                <div className="relative group">
                  <Link
                    to={`/dashboard/academics/classes/section`}
                    className="block p-3 rounded-lg hover:bg-muted  transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="text-base font-medium">Class 1</div>
                        <div className="text-sm text-muted-foreground whitespace-nowrap">
                          3 streams
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-4 h-4" />
                        40 students
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" w-full h-full">
        <div className="flex-1 bg-background overflow-y-auto">
          <ScrollArea className="h-full">
            <header className="border-b">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div>
                  <h1 className="text-xl font-semibold">Section </h1>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/classes">
                          Classes
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator></BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>Section</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </div>
            </header>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <Card className="w-64 relative group">
                  <div className="absolute right-2 top-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="text-lg font-semibold w-8 h-8 flex items-center justify-center rounded-lg">
                      classId
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Class Teacher: teacherName
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-4 h-4" />
                        40 students
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
