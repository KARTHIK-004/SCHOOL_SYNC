import { useState } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export function StatusFilter({ onFilterChange }) {
  const [statuses, setStatuses] = useState({
    active: true,
    draft: false,
    archived: false,
  });

  const handleStatusChange = (status, checked) => {
    const newStatuses = {
      ...statuses,
      [status]: checked,
    };
    setStatuses(newStatuses);
    onFilterChange?.(newStatuses);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 gap-2">
          <ListFilter className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={statuses.active}
          onCheckedChange={(checked) => handleStatusChange("active", checked)}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statuses.draft}
          onCheckedChange={(checked) => handleStatusChange("draft", checked)}
        >
          Draft
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statuses.archived}
          onCheckedChange={(checked) => handleStatusChange("archived", checked)}
        >
          Archived
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
