import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function TableHeader({ title, href, linkTitle, data }) {
  return (
    <div className=" mb-3">
      <div className="flex justify-between items-center border-b py-3">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
          {title} ({data.length})
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" asChild className="h-8 gap-1">
            <Link to={href}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {linkTitle}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
