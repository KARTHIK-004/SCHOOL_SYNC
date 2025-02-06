import React from "react";
import { Badge } from "../ui/badge";

export default function StatusColumn({ row, accessorKey }) {
  const status = row.getValue(`${accessorKey}`);
  return <Badge variant="outline">{status ? "Active" : "Disabled"}</Badge>;
}
