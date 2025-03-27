import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllStudents } from "@/utils/studentAPI";
import DataTable from "@/components/DataTable/TableComponents/DataTable";
import TableHeader from "@/components/DataTable/TableHeader/TableHeader";
import StudentsSkeleton from "./StudentsSkeleton";
import { StudentColumns } from "./StudentColumns";
import { getParentById } from "@/utils/parentAPI";
import { getClassById } from "@/utils/classAPI";
import { getSectionById } from "@/utils/sectionAPI";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllStudents(userData);

        const studentsWithDetails = await Promise.all(
          response.data.map(async (student) => {
            try {
              const [parentRes, classRes, sectionRes] = await Promise.all([
                getParentById(student.parentId),
                getClassById(student.classId),
                getSectionById(student.sectionId),
              ]);

              return {
                ...student,
                parentName: `${parentRes.data.firstName} ${parentRes.data.lastName}`,
                parentContact: parentRes.data.phone,
                className: classRes?.data?.className,
                sectionName: sectionRes?.data?.sectionName,
              };
            } catch (error) {
              console.error("Error fetching details for student:", error);
              return student;
            }
          })
        );

        setStudents(studentsWithDetails);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast({
          variant: "destructive",
          title: "Error fetching students",
          description: error.message || "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  console.log(students);

  if (isLoading) {
    return <StudentsSkeleton />;
  }

  return (
    <div className="p-8">
      <TableHeader
        title="Students"
        linkTitle="Add Student"
        href="/dashboard/students/create"
        data={students}
        model="student"
      />
      <div className="py-8">
        {students && students.length > 0 ? (
          <DataTable data={students} columns={StudentColumns} />
        ) : (
          <p className="text-center">No students found.</p>
        )}
      </div>
    </div>
  );
}
