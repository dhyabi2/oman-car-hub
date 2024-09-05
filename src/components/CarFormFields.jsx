import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ImageSelector from './ImageSelector';
import { carMakes, carModels, colors, fuelTypes, transmissionTypes } from '../utils/carData';

export const MakeModelSelect = ({ make, model, onMakeChange, onModelChange }) => (
  <>
    <ImageSelector
      label="Make"
      options={carMakes.map(make => ({ value: make, image: `/images/car-logos/${make.toLowerCase().replace(' ', '-')}.png` }))}
      value={make}
      onChange={onMakeChange}
    />
    <ImageSelector
      label="Model"
      options={(make ? carModels[make] : []).map(model => ({ value: model, image: `/images/car-models/${make.toLowerCase().replace(' ', '-')}/${model.toLowerCase().replace(' ', '-')}.png` }))}
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
    options={colors.map(color => ({ value: color, image: `/images/car-colors/${color.toLowerCase().replace(' ', '-')}.png` }))}
    value={value}
    onChange={onChange}
  />
);

export const FuelTypeSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Fuel Type"
    options={fuelTypes.map(type => ({ value: type, image: `/images/fuel-types/${type.toLowerCase().replace(' ', '-')}.png` }))}
    value={value}
    onChange={onChange}
  />
);

export const TransmissionSelector = ({ value, onChange }) => (
  <ImageSelector
    label="Transmission"
    options={transmissionTypes.map(type => ({ value: type, image: `/images/transmission-types/${type.toLowerCase().replace(' ', '-')}.png` }))}
    value={value}
    onChange={onChange}
  />
);