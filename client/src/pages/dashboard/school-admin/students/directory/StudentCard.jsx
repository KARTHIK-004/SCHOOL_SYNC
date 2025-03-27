import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const StudentCard = ({ student }) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    gender,
    bloodGroup,
    className,
    sectionName,
    religion,
    nationality,
    address,
    imageUrl,
  } = student;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Information</DialogTitle>
          <DialogDescription>
            Detailed information about {firstName} {lastName}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="flex h-full w-full items-center justify-center md:border-r">
                <div className="flex flex-col items-center space-y-4 md:pr-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={imageUrl}
                      alt={`${firstName} ${lastName}`}
                    />
                    <AvatarFallback>
                      {firstName?.charAt(0)}
                      {lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-medium capitalize">
                      {firstName} {lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {className} - {sectionName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">
                        Date of Birth:
                      </span>
                      <span className="text-sm">{birthDate}</span>
                    </div>
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">Gender:</span>
                      <span className="text-sm capitalize">{gender}</span>
                    </div>
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">Blood Group:</span>
                      <span className="text-sm">{bloodGroup}</span>
                    </div>
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">Religion:</span>
                      <span className="text-sm capitalize">{religion}</span>
                    </div>
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">Nationality:</span>
                      <span className="text-sm capitalize">{nationality}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3 mt-6">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">Email:</span>
                      <span className="text-sm">{email}</span>
                    </div>
                    <div className="grid grid-cols-[150px_1fr] items-center">
                      <span className="font-medium text-sm">Phone:</span>
                      <span className="text-sm">{phone}</span>
                    </div>
                    <div className="grid grid-cols-[150px_1fr] items-start">
                      <span className="font-medium text-sm">Address:</span>
                      <span className="text-sm">{address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-center pt-4">
            <Button asChild variant="outline" className="w-full max-w-xs">
              <Link
                to={`/dashboard/students/${_id}`}
                className="flex items-center justify-center gap-2"
              >
                <span>View Complete Profile</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentCard;
