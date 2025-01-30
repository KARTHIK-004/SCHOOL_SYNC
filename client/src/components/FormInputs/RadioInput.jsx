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

const getGridCols = (optionsLength) => {
  if (optionsLength === 2) return "grid-cols-2";
  if (optionsLength > 2) return "grid-cols-3";
  return "grid-cols-1";
};

const RadioInput = ({
  register,
  errors = {},
  label = "",
  name = "",
  toolTipText,
  options = [],
  icon: Icon,
  layout = "horizontal",
  size = "default",
  grow = false,
  shrink = false,
}) => {
  if (!register || !name || !options) {
    console.error(
      "RadioInput requires 'register', 'name', and 'options' props"
    );
    return null;
  }

  if (!Array.isArray(options)) {
    console.error(
      `RadioInput options prop must be an array, received ${typeof options}`
    );
    return null;
  }

  const sizeStyles = {
    small: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <div
      className={cn("space-y-4", grow && "flex-grow", shrink && "flex-shrink")}
    >
      <div className="flex items-center gap-2">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
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
        {...register(name, {
          required: `${label} is required`,
        })}
        className={cn(
          "grid gap-3 w-full",
          layout === "horizontal"
            ? getGridCols(options.length)
            : "grid-flow-row",
          grow && "flex-grow",
          shrink && "flex-shrink"
        )}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center bg-background border rounded-md transition-colors",
                sizeStyles[size],
                "hover:bg-accent/50",
                options.length === 2 && "justify-center"
              )}
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

      {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-2" />}

      {errors?.[name] && (
        <p className="text-xs text-destructive font-medium">
          {errors[name]?.message || `${label || "This field"} is required`}
        </p>
      )}
    </div>
  );
};

export default RadioInput;
