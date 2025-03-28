// Remove API imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import UpcomingEvents from "@/components/Dashboard/SchoolAdmin/UpcomingEvents";
import { Button } from "@/components/ui/button";
import EventFormModal from "@/components/Dashboard/SchoolAdmin/EventFormModal";

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

export default function EventsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadEvents = () => {
      setEvents(demoEvents);
      setLoading(false);
    };

    loadEvents();
  }, []); // Removed dependencies

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      date: new Date(eventData.date).toISOString(),
    };
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    toast({ title: "Event created successfully!" });
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">School Events</h2>
          <Button onClick={() => setIsModalOpen(true)}>Create New Event</Button>
        </div>

        <UpcomingEvents events={events} loading={loading} showAll={true} />

        <EventFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateEvent}
        />
      </div>
    </ScrollArea>
  );
}
