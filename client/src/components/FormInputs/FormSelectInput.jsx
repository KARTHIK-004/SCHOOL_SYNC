import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CircleHelp, X } from "lucide-react";
import AddNewButton from "./AddNewButton";

const FormSelectInput = ({
  register,
  errors,
  label,
  name,
  href,
  options,
  option,
  setOption,
  toolTipText,
  placeholder,
  showSearch = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options?.filter((opt) => {
    const optionLabel = (opt.label || opt).toLowerCase();
    return optionLabel.includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor={name} className="text-sm font-medium tracking-tight">
            {label}
          </Label>
          {toolTipText && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <CircleHelp className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-sm bg-popover px-3 py-2">
                  <p>{toolTipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Select
          value={option || ""}
          onValueChange={(value) => {
            setOption(value);
            register(name, { required: true }).onChange({
              target: {
                name,
                value,
              },
            });
          }}
        >
          <SelectTrigger
            id={name}
            className={cn(
              "w-full",
              "bg-background border-input hover:bg-accent hover:text-accent-foreground",
              errors[name] && "focus-visible:ring-destructive",
              "data-[placeholder]:text-muted-foreground"
            )}
          >
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {showSearch && (
              <div className="sticky top-0 p-2 bg-popover border-b">
                <div>
                  <input
                    className="flex h-2 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Search options..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-1 top-1 h-7 w-7 p-0 hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery("");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
            <div className="p-1">
              {filteredOptions && filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <SelectItem
                    key={opt.value || opt}
                    value={opt.value || opt}
                    className="cursor-pointer transition-colors"
                  >
                    {opt.label || opt}
                  </SelectItem>
                ))
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No options found
                  </p>
                  {searchQuery && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Try adjusting your search
                    </p>
                  )}
                </div>
              )}
            </div>
          </SelectContent>
        </Select>
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
      {errors[name] && (
        <p className="text-xs text-destructive mt-2 animate-in fade-in-50">
          {errors[name].message || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default FormSelectInput;
