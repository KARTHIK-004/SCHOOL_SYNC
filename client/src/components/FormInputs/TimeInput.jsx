import React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleHelp, Clock as ClockIcon } from "lucide-react";

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const formatTime = (hours, minutes) => {
  if (hours === null || minutes === null) return null;
  return `${hours}:${minutes}`;
};

const TimeInput = ({
  register,
  errors = {},
  label = "",
  name = "",
  toolTipText,
  placeholder = "HH:MM",
}) => {
  if (!register || !name) {
    console.error("TimeInput requires 'register' and 'name' props");
    return null;
  }

  const registration = register(name, {
    required: `${label} is required`,
    setValueAs: (value) => {
      if (!value) return "";
      return value;
    },
  });

  const [hours, setHours] = React.useState(null);
  const [minutes, setMinutes] = React.useState(null);

  const handleHourSelect = (hour) => {
    setHours(hour);
    if (minutes !== null) {
      const formattedTime = formatTime(hour, minutes);
      registration.onChange({
        target: { name, value: formattedTime },
        type: "change",
      });
    }
  };

  const handleMinuteSelect = (minute) => {
    setMinutes(minute);
    if (hours !== null) {
      const formattedTime = formatTime(hours, minute);
      registration.onChange({
        target: { name, value: formattedTime },
        type: "change",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                  <CircleHelp className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !hours && !minutes && "text-muted-foreground",
              errors[name] && "focus-visible:ring-destructive"
            )}
          >
            {hours && minutes ? (
              `${hours}:${minutes}`
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex p-3 gap-2">
            <Select onValueChange={handleHourSelect} value={hours || ""}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent>
                {HOURS.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleMinuteSelect} value={minutes || ""}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {MINUTES.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>

      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TimeInput;
