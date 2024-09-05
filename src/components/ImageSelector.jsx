import React from 'react';
import { Label } from "@/components/ui/label";

const ImageSelector = ({ label, options, value, onChange, disabled = false }) => (
  <div>
    <Label>{label}</Label>
    <div className="grid grid-cols-3 gap-2 mt-2">
      {options.map((option) => (
        <button
          key={option.value}
          className={`p-2 border rounded-md ${value === option.value ? 'border-blue-500' : 'border-gray-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'}`}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
        >
          <img src={option.image} alt={option.value} className="w-full h-auto" />
          <span className="block mt-1 text-xs">{option.value}</span>
        </button>
      ))}
    </div>
  </div>
);

export default ImageSelector;