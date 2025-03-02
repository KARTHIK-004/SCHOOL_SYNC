import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../ui/input";

export default function SearchBar({ data, onSearch, setIsSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setIsSearch(true);
    onSearch(filteredData);
  };
  return (
    <div className="flex justify-between items-center w-full max-w-2xl">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          id="search"
          name="search"
          type="search"
          autoComplete="off"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 transition-colors focus-visible:ring-2"
          aria-label="Search input"
        />
      </div>
    </div>
  );
}
