import {
  Briefcase,
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactCard({ contact, trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const infoCard = [
    { icon: Mail, label: "Email", value: contact.email },
    { icon: Phone, label: "Phone", value: contact.phone },
    { icon: Building2, label: "School", value: contact.school },
    { icon: MapPin, label: "Country", value: contact.country },
    {
      icon: Globe,
      label: "School Website",
      value: contact.website,
      isLink: true,
    },
    {
      icon: Users,
      label: "Students",
      value: `${contact.students} Students`,
    },
    { icon: Briefcase, label: "Role", value: contact.role },
    {
      icon: Clock,
      label: "Submitted",
      value: formatDate(contact.createdAt),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="link">View</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={contact.avatarUrl || "https://github.com/shadcn.png"}
                alt={`${contact.name}'s avatar`}
              />
              <AvatarFallback className="text-2xl">
                {contact.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">{contact.name}</span>
              <Badge variant="secondary" className="mt-1">
                {contact.role}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {infoCard.map((card, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  {card.isLink ? (
                    <a
                      href={card.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{card.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
