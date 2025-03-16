import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { ParentColumns } from "./ParentColumns";
import { getCurrentUser } from "@/utils/authAPI";
import { getAllParents } from "@/utils/parentAPI";
import DataTable from "@/components/DataTable/TableComponents/DataTable";
import TableHeader from "@/components/DataTable/TableHeader/TableHeader";

export default function ParentDirectory() {
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const response = await getAllParents(userData);
        setParents(response.data);
      } catch (error) {
        console.error("Error fetching parents:", error);
        toast({
          variant: "destructive",
          title: "Error fetching parents",
          description: error.message || "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span>Loading parents...</span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TableHeader
        title="Parents"
        linkTitle="Add Parent"
        href="/dashboard/parents/create"
        data={parents}
        model="parent"
      />
      <div className="py-8">
        {parents && parents.length > 0 ? (
          <DataTable data={parents} columns={ParentColumns} />
        ) : (
          <p className="text-center">No parents found.</p>
        )}
      </div>
    </div>
  );
}
