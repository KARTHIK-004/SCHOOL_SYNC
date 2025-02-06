import { useState, useEffect } from "react";
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
import countryOptions, { getCountryFormat } from "@/lib/countryData";

const PhoneInput = ({
  register,
  label = "Phone Number",
  name = "phoneNumber",
  toolTipText,
  defaultCountry = "+91",
}) => {
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState(defaultCountry);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const format = getCountryFormat(countryCode);
    setPlaceholder(format.replace(/#/g, "0"));
  }, [countryCode]);

  if (!register || !name) {
    console.error("PhoneInput requires 'register' and 'name'");
    return null;
  }

  const registration = register(name);

  const formatPhoneNumber = (value, countryCode) => {
    let digits = value.replace(/\D/g, "");

    if (countryCode === "+91") {
      digits = digits.replace(/^91/, "");
      digits = digits.slice(0, 10);

      if (digits.length > 0) {
        return `+91 ${digits.slice(0, 5)}${
          digits.length > 5 ? "" + digits.slice(5) : ""
        }`;
      }
    }

    const format = getCountryFormat(countryCode);
    let formatted = format;
    let digitIndex = 0;

    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === "#") {
        formatted = formatted.replace("#", digits[digitIndex]);
        digitIndex++;
      }
    }
    formatted = formatted.replace(/#/g, "");
    return formatted;
  };

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue, countryCode);
    setValue(formattedValue);
    const event = {
      target: {
        name: e.target.name,
        value: formattedValue,
      },
    };
    registration.onChange(event);
  };

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
    setValue("");
    registration.onChange({
      target: {
        name: name,
        value: "",
      },
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

      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Combobox
            value={countryCode}
            onValueChange={handleCountryCodeChange}
            options={countryOptions.map((option) => ({
              label: option.code,
              value: option.value,
              key: `country-code-${option.code}`,
            }))}
            placeholder="Select country"
            emptyText="No countries found"
            showSearch
          />
        </div>
        <Input
          type="tel"
          placeholder={placeholder}
          {...registration}
          value={value}
          onChange={handleChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
