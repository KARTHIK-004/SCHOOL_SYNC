import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

const DateInput = ({
  register,
  errors = {},
  label = "",
  name = "",
  toolTipText,
  placeholder = "Select date",
  min,
  max,
}) => {
  if (!register || !name) {
    console.error("DateInput requires 'register' and 'name' props");
    return null;
  }

  const registration = register(name, {
    required: `${label} is required`,
  });

  return (
    <div className="space-y-2">
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

      <Input
        type="date"
        min={min}
        max={max}
        placeholder={placeholder}
        {...registration}
        className={cn(
          "w-full",
          errors[name] && "border-destructive focus-visible:ring-destructive"
        )}
      />

      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DateInput;
