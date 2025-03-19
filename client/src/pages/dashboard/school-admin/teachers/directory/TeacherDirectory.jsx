import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { TeacherColumns } from "./TeacherColumns";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllTeachers } from "@/utils/teacherAPI";
import DataTable from "@/components/DataTable/TableComponents/DataTable";
import TableHeader from "@/components/DataTable/TableHeader/TableHeader";
import TeachersSkeleton from "./TeachersSkeleton";

export default function TeacherDirectory() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllTeachers(userData);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        toast({
          variant: "destructive",
          title: "Error fetching teachers",
          description: error.message || "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);
  console.log(teachers);

  if (isLoading) {
    return <TeachersSkeleton />;
  }

  return (
    <div className="p-8">
      <TableHeader
        title="Teachers"
        linkTitle="Add Teacher"
        href="/dashboard/teachers/create"
        data={teachers}
        model="teacher"
      />
      <div className="py-8">
        {teachers && teachers.length > 0 ? (
          <DataTable data={teachers} columns={TeacherColumns} />
        ) : (
          <p className="text-center">No teachers found.</p>
        )}
      </div>
    </div>
  );
}
