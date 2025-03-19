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
import MultiCombobox from "@/components/ui/multi-combobox";
import AddNewButton from "./AddNewButton";

const MultiComboboxInput = ({
  register,
  errors = {},
  label = "",
  name = "",
  href,
  toolTipText,
  options = [],
  placeholder = "Select options...",
  emptyText = "No options available",
  showSearch = false,
}) => {
  const [values, setValues] = useState([]);

  if (!register || !name || !Array.isArray(options)) {
    console.error(
      "MultiComboboxInput requires 'register', 'name', and valid options array"
    );
    return null;
  }

  const registration = register(name, {
    required: `${label} is required`,
  });

  const handleValuesChange = (newValues) => {
    setValues(newValues);
    registration.onChange({
      target: { name, value: newValues },
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
      <div className="flex gap-2">
        <MultiCombobox
          values={values}
          onValuesChange={handleValuesChange}
          options={options}
          placeholder={placeholder}
          emptyText={emptyText}
          label={label}
          showSearch={showSearch}
        />

        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>

      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default MultiComboboxInput;
