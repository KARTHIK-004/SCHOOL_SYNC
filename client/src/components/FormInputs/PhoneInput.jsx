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
import Combobox from "@/components/ui/combobox";

const PhoneInput = ({
  register,
  errors = {},
  label = "Phone Number",
  name = "phoneNumber",
  toolTipText,
  placeholder = "+1 (555) 123-4567",
  required = true,
  validation = {
    pattern: {
      value: /^\+?1?\s*\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
      message: "Invalid phone number format",
    },
  },
  countryOptions = [
    { label: "Canada (+1)", value: "+1" },
    { label: "United Kingdom (+44)", value: "+44" },
    { label: "Australia (+61)", value: "+61" },
    { label: "India (+91)", value: "+91" },
  ],
}) => {
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  if (!register || !name) {
    console.error("PhoneInput requires 'register' and 'name'");
    return null;
  }

  const registration = register(name, {
    ...(required ? { required: `${label} is required` } : {}),
    ...validation,
  });

  const handleChange = (e) => {
    const rawValue = e.target.value;
    setValue(rawValue);
    registration.onChange(e);
  };

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${countryCode} (${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
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

      <div className="flex gap-2 w-full">
        <div className="w-1/3 gap-2">
          <Combobox
            value={countryCode}
            onValueChange={handleCountryCodeChange}
            options={countryOptions.map((option, index) => ({
              label: option.label,
              value: option.value,
              key: `country-code-${option.value}`,
            }))}
            placeholder="Select country code"
            emptyText="No country codes available"
            showSearch
          />
        </div>
        <Input
          type="tel"
          placeholder={placeholder}
          {...registration}
          value={value}
          onChange={handleChange}
          className={`w-full ${errors[name] ? "border-destructive" : ""}`}
        />
      </div>

      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name].message}</p>
      )}
    </div>
  );
};

export default PhoneInput;
