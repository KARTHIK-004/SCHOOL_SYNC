// Remove API imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UpcomingEvents from "@/components/Dashboard/SchoolAdmin/UpcomingEvents";
import { Plus } from "lucide-react";

// Demo data
const demoEvents = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: new Date().toISOString(),
    description: "Annual parent-teacher conference",
  },
  {
    id: 2,
    title: "Sports Day",
    date: new Date(Date.now() + 86400000).toISOString(),
    description: "School annual sports competition",
  },
];

export default function EventDirectory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      setEvents(demoEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  return (
    <ScrollArea className="md:h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold">School Events</h1>
            <p className="text-muted-foreground">
              View all events in the school
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/events/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Link>
          </Button>
        </div>
        <UpcomingEvents events={events} loading={loading} showAll={true} />
      </div>
    </ScrollArea>
  );
}
