import React, { useState } from "react";
import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

const DateInput = ({
  register,
  errors = {},
  label = "Date",
  name = "date",
  toolTipText,
  placeholder = "MM/DD/YYYY",
  required = true,
  validation = {
    pattern: {
      value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      message: "Invalid date format",
    },
  },
  className = "w-full",
}) => {
  const [value, setValue] = useState("");

  if (!register || !name) {
    console.error("DateInput requires 'register' and 'name'");
    return null;
  }

  const registration = register(name, {
    ...(required ? { required: `${label} is required` } : {}),
    ...validation,
  });

  const handleChange = (newValue) => {
    setValue(newValue);
    registration.onChange({
      target: { name, value: newValue },
      type: "change",
    });
  };

  return (
    <div className="space-y-2 relative w-full">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
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

      <div className={`flex items-center gap-2 ${className}`}>
        <Input
          type="text"
          placeholder={placeholder}
          {...registration}
          value={value}
          readOnly
          className="flex-1"
        />
        <DatePicker value={value} onChange={handleChange} />
      </div>

      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DateInput;
