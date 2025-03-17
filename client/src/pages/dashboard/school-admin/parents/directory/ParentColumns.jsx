import DateColumn from "@/components/DataTable/TableColumns/DateColumn";
import SortableColumn from "@/components/DataTable/TableColumns/SortableColumn";
import ActionColumn from "@/components/DataTable/TableColumns/ActionColumn";
import ParentCard from "./ParentCard";

export const ParentColumns = [
  {
    accessorKey: "Name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <div className="flex items-center space-x-3">
          <img
            src={parent.image || "/parent.png"}
            alt={parent.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium capitalize">
              {parent.firstName.toLowerCase()} {parent.lastName.toLowerCase()}
            </h2>
            <p className="text-sm text-muted-foreground capitalize">
              {parent.relationship.toLowerCase()}
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
      const parent = row.original;
      return (
        <div className="flex flex-col items-start space-y-1">
          <h2 className="font-medium">{parent.email.toLowerCase()}</h2>
          <p className="text-sm text-muted-foreground">{parent.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ParentCard parent={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <ActionColumn
          model="parent"
          editEndpoint={`/dashboard/parents/edit/${parent._id}`}
          id={parent._id}
        />
      );
    },
  },
];
