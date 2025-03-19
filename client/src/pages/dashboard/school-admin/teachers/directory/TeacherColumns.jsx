import DateColumn from "@/components/DataTable/TableColumns/DateColumn";
import SortableColumn from "@/components/DataTable/TableColumns/SortableColumn";
import ActionColumn from "@/components/DataTable/TableColumns/ActionColumn";
import TeacherCard from "./TeacherCard";

export const TeacherColumns = [
  {
    accessorKey: "Name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center space-x-3">
          <img
            src={teacher.image || "/teacher.png"}
            alt={teacher.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium capitalize">
              {teacher.firstName} {teacher.lastName.toLowerCase()}
            </h2>
            <p className="text-sm text-muted-foreground capitalize">
              EMP ID - {teacher.employeeId}
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
      const teacher = row.original;
      return (
        <div className="flex flex-col items-start space-y-1">
          <h2 className="font-medium">{teacher.email.toLowerCase()}</h2>
          <p className="text-sm text-muted-foreground">{teacher.phoneNumber}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <TeacherCard teacher={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <ActionColumn
          model="teacher"
          editEndpoint={`/dashboard/teachers/edit/${teacher._id}`}
          id={teacher._id}
        />
      );
    },
  },
];
