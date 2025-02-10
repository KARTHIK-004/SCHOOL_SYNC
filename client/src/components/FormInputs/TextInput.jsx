import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

const TextInput = ({
  register,
  errors,
  label,
  type = "text",
  name,
  toolTipText,
  unit,
  icon: Icon,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                  <CircleHelp className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
        <Input
          id={name}
          type={type === "number" ? "text" : type}
          {...register(name, {
            required: true,
            pattern: {
              value: type === "number" ? /^-?\d+(\.\d+)?$/ : /.+/,
              message: type === "number" ? "Invalid number format" : "",
            },
          })}
          className={cn(
            "w-full",
            Icon && "pl-10",
            errors[name] && "focus-visible:ring-destructive"
          )}
          placeholder={placeholder || label}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-muted-foreground">{unit}</span>
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-xs text-destructive">
          {errors[name].message || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default TextInput;
