import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

const RadioInput = ({
  register,
  errors = {},
  label = "",
  name = "",
  toolTipText,
  options = [],
  gridSize = 3,
}) => {
  if (!register || !name || !options) {
    console.error(
      "RadioInput requires 'register', 'name', and 'options' props"
    );
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

      <RadioGroup
        name={registration.name}
        onValueChange={(value) => {
          registration.onChange({
            target: { name, value },
            type: "change",
          });
        }}
        className={`grid grid-cols-${gridSize} gap-3 w-full`}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <div
              key={option.value}
              className="flex items-center bg-background border rounded-md transition-colors px-4 py-3 text-sm hover:bg-accent/50"
            >
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
                className="mr-2"
              />
              <Label
                htmlFor={`${name}-${option.value}`}
                className="cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No options available</p>
        )}
      </RadioGroup>

      {errors[name] && (
        <p className="text-xs text-destructive">{label} is required</p>
      )}
    </div>
  );
};

export default RadioInput;
