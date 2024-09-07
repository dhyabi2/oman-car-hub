import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ImageSelector = ({ label, options, value, onChange, disabled = false, columns = 3 }) => (
  <div>
    <Label>{label}</Label>
    <div className={`grid grid-cols-${columns} gap-2 mt-2`}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? "default" : "outline"}
          className={`p-2 flex flex-col items-center justify-center h-20 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'}`}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
        >
          {option.icon}
          <span className="mt-1 text-xs">{option.value}</span>
        </Button>
      ))}
    </div>
  </div>
);

export default ImageSelector;