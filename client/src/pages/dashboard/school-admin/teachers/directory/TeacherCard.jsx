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

const TeacherCard = ({ teacher }) => {
  const {
    _id,
    title,
    firstName,
    lastName,
    email,
    employeeId,
    phoneNumber,
    contractType,
    teachingLevel,
    qualification,
    joinDate,
    nationality,
    address,
    imageUrl,
  } = teacher;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teacher Information</DialogTitle>
          <DialogDescription>
            Detailed information about {firstName} {lastName}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="flex flex-col items-center space-y-4 md:border-r md:pr-6">
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
                    {title && `${title}. `}
                    {firstName} {lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {contractType} | EMP ID - {employeeId}
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-medium text-sm">Email:</span>
                      <span className="text-sm overflow-hidden text-ellipsis">
                        {email}
                      </span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-medium text-sm">Phone:</span>
                      <span className="text-sm">{phoneNumber}</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-medium text-sm">
                        Qualification:
                      </span>
                      <span className="text-sm capitalize">
                        {qualification}
                      </span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="font-medium text-sm">
                        Teaching Level:
                      </span>
                      <span className="text-sm capitalize">
                        {teachingLevel}
                      </span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-start">
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
                to={`/dashboard/teachers/${_id}`}
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

export default TeacherCard;
