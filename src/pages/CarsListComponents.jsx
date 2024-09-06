import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertCircle, DollarSign, Calendar, Car, Fuel, Sliders, Eye } from 'lucide-react';
import { carMakes, carModels, colors, fuelTypes, transmissionTypes, locations } from '../utils/carData';
import { getNestedTranslation } from '../utils/translations';

// ... existing imports and components ...

const FilterSelect = ({ label, value, options, onChange, t }) => (
  <div>
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {getNestedTranslation(t, option.toLowerCase()) || option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// ... other existing components ...

export const FiltersCard = ({ filters, maxPriceInData, onFilterChange, t }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center">
        <Sliders className="mr-2" />
        {t.filters}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FilterSelect
          label={t.make}
          value={filters.make}
          options={[t.allMakes, ...carMakes]}
          onChange={(value) => onFilterChange('make', value)}
          t={t}
        />
        <FilterSelect
          label={t.model}
          value={filters.model}
          options={
            filters.make === t.allMakes
              ? [t.allModels]
              : [t.allModels, ...(carModels[filters.make] || [])]
          }
          onChange={(value) => onFilterChange('model', value)}
          t={t}
        />
        <RangeFilter
          label={t.yearRange}
          min={1990}
          max={new Date().getFullYear()}
          value={[filters.minYear, filters.maxYear]}
          onChange={([min, max]) => {
            onFilterChange('minYear', min);
            onFilterChange('maxYear', max);
          }}
          unit={t.year}
          icon={Calendar}
        />
        <RangeFilter
          label={t.priceRange}
          min={0}
          max={maxPriceInData}
          value={[filters.minPrice, filters.maxPrice]}
          onChange={([min, max]) => {
            onFilterChange('minPrice', min);
            onFilterChange('maxPrice', max);
          }}
          unit={t.currency}
          icon={DollarSign}
        />
        <FilterSelect
          label={t.transmission}
          value={filters.transmission}
          options={['all', ...transmissionTypes]}
          onChange={(value) => onFilterChange('transmission', value)}
          t={t}
        />
        <FilterSelect
          label={t.fuelType}
          value={filters.fuelType}
          options={['all', ...fuelTypes]}
          onChange={(value) => onFilterChange('fuelType', value)}
          t={t}
        />
        <FilterSelect
          label={t.color}
          value={filters.color}
          options={['all', ...colors]}
          onChange={(value) => onFilterChange('color', value)}
          t={t}
        />
        <RangeFilter
          label={t.mileageRange}
          min={0}
          max={1000000}
          value={[filters.minMileage, filters.maxMileage]}
          onChange={([min, max]) => {
            onFilterChange('minMileage', min);
            onFilterChange('maxMileage', max);
          }}
          unit="km"
          icon={Car}
        />
        <FilterSelect
          label={t.condition}
          value={filters.condition}
          options={['all', 'New', 'Used']}
          onChange={(value) => onFilterChange('condition', value)}
          t={t}
        />
        <FilterSelect
          label={t.location}
          value={filters.location}
          options={['all', ...locations]}
          onChange={(value) => onFilterChange('location', value)}
          t={t}
        />
        <FilterSelect
          label={t.numberOfDoors}
          value={filters.numberOfDoors}
          options={['all', '2', '3', '4', '5']}
          onChange={(value) => onFilterChange('numberOfDoors', value)}
          t={t}
        />
        <FilterSelect
          label={t.numberOfSeats}
          value={filters.numberOfSeats}
          options={['all', '2', '4', '5', '7', '8']}
          onChange={(value) => onFilterChange('numberOfSeats', value)}
          t={t}
        />
        <FilterSelect
          label={t.drivetrain}
          value={filters.drivetrain}
          options={['all', 'FWD', 'RWD', 'AWD', '4WD']}
          onChange={(value) => onFilterChange('drivetrain', value)}
          t={t}
        />
      </div>
    </CardContent>
  </Card>
);

// ... other existing components ...