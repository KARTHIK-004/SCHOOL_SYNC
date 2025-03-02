import {
  filterByLast7Days,
  filterByThisMonth,
  filterByThisYear,
  filterByToday,
  filterByYesterday,
} from "@/lib/dateFilters";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DateFilters({ data, onFilter, setIsSearch }) {
  const options = [
    { value: "life", label: "Life time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" }, // Added this option as it's in the imports
    { value: "last-7-days", label: "Last 7 days" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  const [selectedFilter, setSelectedFilter] = useState(options[0].value);

  const handleChange = (valueString) => {
    // Find the selected option to update state with the full option object
    const selectedOption = options.find(
      (option) => option.value === valueString
    );
    setSelectedFilter(valueString);
    setIsSearch(false);

    // Apply the appropriate filter based on selection
    let filteredData;

    switch (valueString) {
      case "life":
        filteredData = data;
        break;
      case "today":
        filteredData = filterByToday(data);
        break;
      case "yesterday":
        filteredData = filterByYesterday(data);
        break;
      case "last-7-days":
        filteredData = filterByLast7Days(data);
        break;
      case "month":
        filteredData = filterByThisMonth(data);
        break;
      case "year":
        filteredData = filterByThisYear(data);
        break;
      default:
        filteredData = data;
    }

    onFilter(filteredData);
    console.log("Selected filter:", valueString);
  };

  return (
    <div className="w-full">
      <Select defaultValue={selectedFilter} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
