import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import ContactCard from "@/components/DataTableColumns/ContactCard";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumn column={column} title="Full Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="Phone" />,
  },
  {
    accessorKey: "school",
    header: ({ column }) => (
      <SortableColumn column={column} title="School Name" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ContactCard contact={row.original} />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <ActionColumn
          row={row}
          model="contact"
          editEndpoint={`#`}
          id={contact.id}
        />
      );
    },
  },
];
