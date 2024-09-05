import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ImageSelector from './ImageSelector';
import { carBrands, colors, fuelTypes, transmissionTypes } from '../utils/carData';
import { Car, Fuel, Palette, Settings, DoorOpen, Users, Compass, CheckCircle } from 'lucide-react';

export const MakeModelSelect = ({ make, model, onMakeChange, onModelChange }) => (
  <>
    <ImageSelector
      label="Make"
      options={carBrands.map(brand => ({ value: brand.brand, icon: <Car size={24} /> }))}
      value={make}
      onChange={onMakeChange}
    />
    <ImageSelector
      label="Model"
      options={(make ? carBrands.find(b => b.brand === make)?.models || [] : []).map(model => ({ value: model, icon: <Car size={24} /> }))}
      value={model}
      onChange={onModelChange}
      disabled={!make}
    />
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

export const ColorSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Color"
    options={[...colors, 'Other'].map(color => ({ value: color, icon: <Palette size={24} color={color.toLowerCase()} /> }))}
    value={value}
    onChange={onChange}
  />
);

export const FuelTypeSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Fuel Type"
    options={fuelTypes.map(type => ({ value: type, icon: <Fuel size={24} /> }))}
    value={value}
    onChange={onChange}
  />
);

export const TransmissionSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Transmission"
    options={transmissionTypes.map(type => ({ value: type, icon: <Settings size={24} /> }))}
    value={value}
    onChange={onChange}
  />
);

export const DoorsSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Number of Doors"
    options={[2, 3, 4, 5].map(num => ({ value: num, icon: <DoorOpen size={24} /> }))}
    value={value}
    onChange={onChange}
  />
);

export const SeatsSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Number of Seats"
    options={[2, 4, 5, 7, 8].map(num => ({ value: num, icon: <Users size={24} /> }))}
    value={value}
    onChange={onChange}
  />
);

export const DrivetrainSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Drivetrain"
    options={['FWD', 'RWD', 'AWD', '4WD'].map(type => ({ value: type, icon: <Compass size={24} /> }))}
    value={value}
    onChange={onChange}
  />
);

export const ConditionSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Condition"
    options={['New', 'Used', 'Certified Pre-Owned'].map(condition => ({ value: condition, icon: <CheckCircle size={24} /> }))}
    value={value}
    onChange={onChange}
  />
);