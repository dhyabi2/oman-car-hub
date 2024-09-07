import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ImageSelector from './ImageSelector';
import { Car, Fuel, Palette, Settings, Users, CheckCircle, Calendar } from 'lucide-react';

import { carBrands, carModels, colors, fuelTypes, transmissionTypes } from '../utils/carData';

export const MakeModelSelect = ({ make, model, onMakeChange, onModelChange, t }) => (
  <>
    <ImageSelector
      label={t.make}
      options={carBrands.map(brand => ({ value: brand.brand, icon: <img src={brand.logo} alt={brand.brand} className="w-6 h-6 object-contain" />, label: brand.brand }))}
      value={make}
      onChange={onMakeChange}
    />
    <ImageSelector
      label={t.model}
      options={(make ? carModels[make] : []).map(model => ({ value: model, icon: <Car size={24} />, label: model }))}
      value={model}
      onChange={onModelChange}
      disabled={!make}
    />
  </>
);

export const MileageInput = ({ value, onChange, t }) => (
  <div>
    <Label htmlFor="mileage">{t.mileage} (km)</Label>
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

export const PriceRangeInput = ({ minPrice, maxPrice, onChange, t }) => (
  <div>
    <Label>{t.priceRange} (OMR)</Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minPrice}
        onChange={(e) => onChange('minPrice', Number(e.target.value))}
        placeholder={t.min}
        className="w-24"
      />
      <span>{t.to}</span>
      <Input
        type="number"
        value={maxPrice}
        onChange={(e) => onChange('maxPrice', Number(e.target.value))}
        placeholder={t.max}
        className="w-24"
      />
    </div>
  </div>
);

export const ColorSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t.color}
    options={colors.map(color => ({ 
      value: color, 
      icon: <Car size={24} fill={color.toLowerCase() === 'other' ? 'none' : color.toLowerCase()} />, 
      label: t[color.toLowerCase()] || color
    }))}
    value={value}
    onChange={onChange}
  />
);

export const FuelTypeSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t.fuelType}
    options={fuelTypes.map(type => ({ value: type, icon: <Fuel size={24} />, label: t[type.toLowerCase()] }))}
    value={value}
    onChange={onChange}
  />
);

export const TransmissionSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t.transmission}
    options={transmissionTypes.map(type => ({ value: type, icon: <Settings size={24} />, label: t[type.toLowerCase()] }))}
    value={value}
    onChange={onChange}
  />
);

export const DoorsSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t.numberOfDoors}
    options={[2, 3, 4, 5].map(num => ({ value: num, icon: <Car size={24} />, label: num.toString() }))}
    value={value}
    onChange={onChange}
  />
);

export const SeatsSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t.numberOfSeats}
    options={[2, 4, 5, 7, 8].map(num => ({ value: num, icon: <Users size={24} />, label: num.toString() }))}
    value={value}
    onChange={onChange}
  />
);

export const ConditionSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t.condition}
    options={['New', 'Used'].map(condition => ({ value: condition, icon: <CheckCircle size={24} />, label: t[condition.toLowerCase()] }))}
    value={value}
    onChange={onChange}
  />
);

export const YearSelector = ({ value, onChange, t }) => (
  <div>
    <Label htmlFor="year">{t.year}</Label>
    <div className="flex items-center space-x-2">
      <Slider
        id="year"
        min={1990}
        max={new Date().getFullYear()}
        step={1}
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