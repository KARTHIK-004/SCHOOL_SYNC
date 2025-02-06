import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/Dashboard/Tables/TableHeader";
import { getAllContacts } from "@/utils/contactAPI";

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllContacts();
        setContacts(response.data.contacts || []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();
  }, []);

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
        <DataTable data={contacts} columns={columns} />
      </div>
    </div>
  );
}
