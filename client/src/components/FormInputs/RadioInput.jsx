import React from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioInput({
  radioOptions,
  register,
  label,
  name,
  errors,
}) {
  return (
    <div className="grid gap-3 pt-4">
      <Label htmlFor={name} className="text-base font-semibold">
        {label}
      </Label>
      <RadioGroup className="flex flex-col sm:flex-row">
        {radioOptions.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <RadioGroupItem
              id={item.id}
              value={item.id}
              {...register(name, { required: true })}
            />
            <Label
              htmlFor={item.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {errors[name] && (
        <span className="text-sm font-medium text-destructive">
          {label} is required
        </span>
      )}
    </div>
  );
}
