import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { carMakes, carModels } from '../utils/carData';

export const MakeModelSelect = ({ make, model, onMakeChange, onModelChange }) => (
  <>
    <div>
      <Label htmlFor="make">Make</Label>
      <Select value={make} onValueChange={onMakeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select make" />
        </SelectTrigger>
        <SelectContent>
          {carMakes.map((carMake) => (
            <SelectItem key={carMake} value={carMake}>{carMake}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="model">Model</Label>
      <Select value={model} onValueChange={onModelChange} disabled={!make}>
        <SelectTrigger>
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {make && carModels[make]?.map((carModel) => (
            <SelectItem key={carModel} value={carModel}>{carModel}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </>
);

export const MileageInput = ({ value, onChange }) => (
  <div>
    <Label htmlFor="mileage">Mileage (km)</Label>
    <div className="flex items-center space-x-2">
      <Slider
        id="mileage"
        min={0}
        max={300000}
        step={1000}
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
      />
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24"
      />
    </div>
  </div>
);

export const PriceRangeInput = ({ minPrice, maxPrice, onChange }) => (
  <div>
    <Label>Price Range (OMR)</Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minPrice}
        onChange={(e) => onChange('minPrice', Number(e.target.value))}
        placeholder="Min"
        className="w-24"
      />
      <span>to</span>
      <Input
        type="number"
        value={maxPrice}
        onChange={(e) => onChange('maxPrice', Number(e.target.value))}
        placeholder="Max"
        className="w-24"
      />
    </div>
  </div>
);