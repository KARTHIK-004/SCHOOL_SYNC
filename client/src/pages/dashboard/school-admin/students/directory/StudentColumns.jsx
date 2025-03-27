import DateColumn from "@/components/DataTable/TableColumns/DateColumn";
import SortableColumn from "@/components/DataTable/TableColumns/SortableColumn";
import ActionColumn from "@/components/DataTable/TableColumns/ActionColumn";
import StudentCard from "./StudentCard";

export const StudentColumns = [
  {
    accessorKey: "Name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center space-x-3">
          <img
            src={student.image || "/student.png"}
            alt={student.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium capitalize">
              {student.firstName.toLowerCase()} {student.lastName.toLowerCase()}
            </h2>
            <p className="text-sm text-muted-foreground capitalize">
              {student.className} - {student.sectionName}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => <SortableColumn column={column} title="Contact" />,
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex flex-col items-start space-y-1">
          <h2 className="font-medium">{student.email?.toLowerCase()}</h2>
          <p className="text-sm text-muted-foreground">{student.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <StudentCard student={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Enrolled",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <ActionColumn
          model="student"
          editEndpoint={`/dashboard/students/edit/${student._id}`}
          id={student._id}
        />
      );
    },
  },
];
