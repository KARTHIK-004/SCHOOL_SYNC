import React from "react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
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
import { CircleHelp, Calendar as CalendarIcon } from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date) => {
  if (!date) return null;
  return format(new Date(date), "yyyy-MM-dd");
};

const DateInput = ({
  register,
  errors = {},
  label = "",
  name = "",
  toolTipText,
  placeholder = "YYYY-MM-DD",
  min,
  max = new Date(),
}) => {
  if (!register || !name) {
    console.error("DateInput requires 'register' and 'name' props");
    return null;
  }

  const registration = register(name, {
    required: `${label} is required`,
    setValueAs: (value) => {
      if (!value) return "";
      return formatDate(value);
    },
  });

  const [date, setDate] = React.useState(null);
  const [calendarDate, setCalendarDate] = React.useState(new Date());

  const minYear = min ? new Date(min).getFullYear() : 1900;
  const maxYear = max ? new Date(max).getFullYear() : 2025;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  const handleYearSelect = (year) => {
    const newDate = new Date(calendarDate.setFullYear(parseInt(year)));
    setCalendarDate(newDate);
  };

  const handleMonthSelect = (month) => {
    const newDate = new Date(calendarDate.setMonth(MONTHS.indexOf(month)));
    setCalendarDate(newDate);
  };

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    if (newDate) {
      setCalendarDate(newDate);
      const formattedDate = formatDate(newDate);
      registration.onChange({
        target: { name, value: formattedDate },
        type: "change",
      });
    } else {
      registration.onChange({
        target: { name, value: "" },
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
              !date && "text-muted-foreground",
              errors[name] && "focus-visible:ring-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="border-b p-3">
            <div className="flex items-center justify-between gap-2">
              <Select
                onValueChange={handleMonthSelect}
                defaultValue={MONTHS[calendarDate.getMonth()]}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={handleYearSelect}
                defaultValue={calendarDate.getFullYear().toString()}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (min && new Date(min) > date) return true;
              if (max && new Date(max) < date) return true;
              return false;
            }}
            initialFocus
            month={calendarDate}
            onMonthChange={setCalendarDate}
          />
        </PopoverContent>
      </Popover>

      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DateInput;
