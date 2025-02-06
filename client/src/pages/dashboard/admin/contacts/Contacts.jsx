import { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/Dashboard/Tables/TableHeader";
import { getAllContacts } from "@/utils/contactAPI";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllContacts();
        setContacts(response.data.contacts || []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast({
          variant: "destructive",
          title: "Error fetching contacts",
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
        <span>Loading contacts...</span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TableHeader
        title="Contacts"
        linkTitle="Add Contact"
        href="/contact-us"
        data={contacts}
        model="contact"
      />
      <div className="py-8">
        {contacts.length > 0 ? (
          <DataTable data={contacts} columns={columns} />
        ) : (
          <p className="text-center">No contacts found.</p>
        )}
      </div>
    </div>
  );
}
