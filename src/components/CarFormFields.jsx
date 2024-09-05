import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ImageSelector from './ImageSelector';
import { Car, Fuel, Palette, Settings, DoorOpen, Users, Compass, CheckCircle } from 'lucide-react';

import { carMakes, carModels, colors, fuelTypes, transmissionTypes } from '../utils/carData';

export const MakeModelSelect = ({ make, model, onMakeChange, onModelChange, t }) => (
  <>
    <ImageSelector
      label={t('make')}
      options={carMakes.map(make => ({ value: make, icon: <Car size={24} />, label: make }))}
      value={make}
      onChange={onMakeChange}
    />
    <ImageSelector
      label={t('model')}
      options={(make ? carModels[make] : []).map(model => ({ value: model, icon: <Car size={24} />, label: model }))}
      value={model}
      onChange={onModelChange}
      disabled={!make}
    />
  </>
);

export const MileageInput = ({ value, onChange, t }) => (
  <div>
    <Label htmlFor="mileage">{t('mileage')} (km)</Label>
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
    <Label>{t('priceRange')} (OMR)</Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minPrice}
        onChange={(e) => onChange('minPrice', Number(e.target.value))}
        placeholder={t('min')}
        className="w-24"
      />
      <span>{t('to')}</span>
      <Input
        type="number"
        value={maxPrice}
        onChange={(e) => onChange('maxPrice', Number(e.target.value))}
        placeholder={t('max')}
        className="w-24"
      />
    </div>
  </div>
);

export const ColorSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('color')}
    options={colors.map(color => ({ value: color, icon: <Palette size={24} color={color.toLowerCase()} />, label: t(color.toLowerCase()) }))}
    value={value}
    onChange={onChange}
  />
);

export const FuelTypeSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('fuelType')}
    options={fuelTypes.map(type => ({ value: type, icon: <Fuel size={24} />, label: t(type.toLowerCase()) }))}
    value={value}
    onChange={onChange}
  />
);

export const TransmissionSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('transmission')}
    options={transmissionTypes.map(type => ({ value: type, icon: <Settings size={24} />, label: t(type.toLowerCase()) }))}
    value={value}
    onChange={onChange}
  />
);

export const DoorsSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('numberOfDoors')}
    options={[2, 3, 4, 5].map(num => ({ value: num, icon: <DoorOpen size={24} />, label: num.toString() }))}
    value={value}
    onChange={onChange}
  />
);

export const SeatsSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('numberOfSeats')}
    options={[2, 4, 5, 7, 8].map(num => ({ value: num, icon: <Users size={24} />, label: num.toString() }))}
    value={value}
    onChange={onChange}
  />
);

export const DrivetrainSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('drivetrain')}
    options={['FWD', 'RWD', 'AWD', '4WD'].map(type => ({ value: type, icon: <Compass size={24} />, label: t(type.toLowerCase()) }))}
    value={value}
    onChange={onChange}
  />
);

export const ConditionSelector = ({ value, onChange, t }) => (
  <ImageSelector
    label={t('condition')}
    options={['New', 'Used', 'Certified Pre-Owned'].map(condition => ({ value: condition, icon: <CheckCircle size={24} />, label: t(condition.toLowerCase()) }))}
    value={value}
    onChange={onChange}
  />
);

export const CarFormFields = ({ formData, handleInputChange, t }) => (
  <>
    <MakeModelSelect
      make={formData.make}
      model={formData.model}
      onMakeChange={(value) => handleInputChange('make', value)}
      onModelChange={(value) => handleInputChange('model', value)}
      t={t}
    />
    <MileageInput
      value={formData.mileage}
      onChange={(value) => handleInputChange('mileage', value)}
      t={t}
    />
    <ColorSelector
      value={formData.color}
      onChange={(value) => handleInputChange('color', value)}
      t={t}
    />
    <FuelTypeSelector
      value={formData.fuel_type}
      onChange={(value) => handleInputChange('fuel_type', value)}
      t={t}
    />
    <TransmissionSelector
      value={formData.transmission}
      onChange={(value) => handleInputChange('transmission', value)}
      t={t}
    />
    <DoorsSelector
      value={formData.number_of_doors}
      onChange={(value) => handleInputChange('number_of_doors', value)}
      t={t}
    />
    <SeatsSelector
      value={formData.number_of_seats}
      onChange={(value) => handleInputChange('number_of_seats', value)}
      t={t}
    />
    <DrivetrainSelector
      value={formData.drivetrain}
      onChange={(value) => handleInputChange('drivetrain', value)}
      t={t}
    />
    <ConditionSelector
      value={formData.condition}
      onChange={(value) => handleInputChange('condition', value)}
      t={t}
    />
  </>
);