import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TeachersSkeleton() {
  return (
    <ScrollArea className="sm:h-full lg:h-[calc(100vh-4rem)]">
      <div className="flex flex-col min-h-screen p-8 pt-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-8 ml-2" />
          </div>
          <Button variant="outline" className="bg-transparent" disabled>
            <Plus className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </Button>
        </div>

        <Separator />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder=""
              className="pl-10 bg-transparent border-border"
              disabled
            />
          </div>

          <div className="flex items-center border border-border rounded-md px-3 py-2">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-5 w-[240px]" />
          </div>

          <div className="flex justify-between gap-4">
            <Select disabled>
              <SelectTrigger className="bg-transparent border-border">
                <Skeleton className="h-4 w-24" />
              </SelectTrigger>
            </Select>

            <Button
              variant="outline"
              className="bg-transparent border-border"
              disabled
            >
              <Skeleton className="h-4 w-12" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-border p-4">
            <div>
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-4 w-16" />
            </div>
            <div>
              <Skeleton className="h-4 w-10" />
            </div>
            <div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Table Rows - Skeleton */}
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 border-b border-border p-4 items-center"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div>
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Select disabled>
                <SelectTrigger className="w-16 h-8 bg-transparent border-border">
                  <Skeleton className="h-4 w-8" />
                </SelectTrigger>
              </Select>
            </div>

            <div>
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-transparent border-border"
                disabled
              >
                <ChevronFirst className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-transparent border-border"
                disabled
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-transparent border-border"
                disabled
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-transparent border-border"
                disabled
              >
                <ChevronLast className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
