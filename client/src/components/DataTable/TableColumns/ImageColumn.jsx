import React from "react";

export default function ImageColumn({ row, accessorKey }) {
  const imageUrl = row.getValue(`${accessorKey}`);
  return (
    <div className="shrink-0">
      <img
        alt={accessorKey}
        className="aspect-square rounded-md object-cover"
        height="50"
        src={imageUrl ?? ""}
        width="50"
      />
    </div>
  );
}
