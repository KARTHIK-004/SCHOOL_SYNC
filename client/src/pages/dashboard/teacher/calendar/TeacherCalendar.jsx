import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Demo data
const demoEvents = [
  {
    id: 1,
    title: "Math Class - Grade 10",
    date: "2023-11-15",
    time: "09:00 - 10:30",
    location: "Room 302",
    type: "class",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2023-11-16",
    time: "14:00 - 15:30",
    location: "Conference Room A",
    type: "meeting",
  },
  {
    id: 3,
    title: "Science Class - Grade 9",
    date: "2023-11-17",
    time: "11:00 - 12:30",
    location: "Lab 105",
    type: "class",
  },
  {
    id: 4,
    title: "Staff Development Workshop",
    date: "2023-11-20",
    time: "13:00 - 16:00",
    location: "Auditorium",
    type: "workshop",
  },
  {
    id: 5,
    title: "Math Class - Grade 11",
    date: "2023-11-21",
    time: "10:00 - 11:30",
    location: "Room 304",
    type: "class",
  },
];

export default function TeacherCalendar() {
  const [events] = useState(demoEvents);

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <h2 className="text-2xl font-bold">My Calendar</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/dashboard/teacher/calendar/create">
              <CalendarDays className="h-4 w-4 mr-2" />
              Add Event
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
