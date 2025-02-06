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
} from "../ui/select";

export default function DateFilters({ data, onFilter, setIsSearch }) {
  const options = [
    { value: "life", label: "Life time" },
    { value: "today", label: "Today" },
    { value: "last-7-days", label: "Last 7 days" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This year" },
  ];
  const [selectedFilter, setSelectedFilter] = useState(options[0]);

  const handleChange = (item) => {
    const valueString = item?.value;
    setSelectedFilter(item);
    setIsSearch(false);
    if (valueString === "life") {
      onFilter(data);
    } else if (valueString === "today") {
      const filteredData = filterByToday(data);
      onFilter(filteredData);
    } else if (valueString === "yesterday") {
      const filteredData = filterByYesterday(data);
      onFilter(filteredData);
    } else if (valueString === "last-7-days") {
      const filteredData = filterByLast7Days(data);
      onFilter(filteredData);
    } else if (valueString === "month") {
      const filteredData = filterByThisMonth(data);
      onFilter(filteredData);
    } else if (valueString === "year") {
      const filteredData = filterByThisYear(data);
      onFilter(filteredData);
    }
    console.log("value:", valueString);
  };
  return (
    <div className="w-full">
      <Select defaultValue="life" onValueChange={handleChange}>
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
