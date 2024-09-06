import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertCircle, DollarSign, Calendar, Car, Fuel, Sliders, Eye } from 'lucide-react';
import { carMakes, carModels, colors, fuelTypes, transmissionTypes, locations } from '../utils/carData';
import { translations } from '../utils/translations';

const getTranslation = (language, key, fallback = key) => {
  return translations[language]?.[key] || fallback;
};

const FilterSelect = ({ label, value, options, onChange }) => (
  <div>
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const RangeFilter = ({ label, min, max, value, onChange, unit, icon: Icon }) => (
  <div>
    <Label className="flex items-center">
      {Icon && <Icon className="mr-2" />}
      {label} ({unit})
    </Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={value[0]}
        onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
        className="w-20"
      />
      <span>to</span>
      <Input
        type="number"
        value={value[1]}
        onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
        className="w-20"
      />
    </div>
  </div>
);

export const NoCarsList = ({ language }) => (
  <div className="text-center py-10">
    <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
      <AlertCircle className="mr-2" />
      {getTranslation(language, 'noCarsFound', 'No Cars Found')}
    </h2>
    <p>{getTranslation(language, 'tryDifferentFilters', 'Try adjusting your filters or search criteria')}</p>
  </div>
);

export const CarCard = ({ car, onViewDetails, language }) => (
  <Card className="overflow-hidden">
    <div className="relative pb-[75%]">
      <img
        src={car.photos[0]}
        alt={`${car.make} ${car.model}`}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
    <CardContent className="p-4">
      <h2 className="text-2xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
      <p className="text-3xl font-bold text-red-600 mb-4">{car.price} {getTranslation(language, 'currency', 'OMR')}</p>
      <div className="grid grid-cols-2 gap-2 mb-4 text-lg">
        <p className="flex items-center"><Car className="mr-1" /> {car.mileage} km</p>
        <p className="flex items-center"><Sliders className="mr-1" /> {car.transmission}</p>
        <p className="flex items-center"><Fuel className="mr-1" /> {car.fuel_type}</p>
        <p className="flex items-center"><Calendar className="mr-1" /> {car.year}</p>
      </div>
      <Button className="w-full mt-2 flex items-center justify-center" onClick={() => onViewDetails(car.id)}>
        <Eye className="mr-2" />
        {getTranslation(language, 'viewDetails', 'View Details')}
      </Button>
    </CardContent>
  </Card>
);

export const FiltersCard = ({ filters, maxPriceInData, onFilterChange, language }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <FilterSelect
      label={getTranslation(language, 'make', 'Make')}
      value={filters.make}
      options={[getTranslation(language, 'allMakes', 'All Makes'), ...carMakes]}
      onChange={(value) => onFilterChange('make', value)}
    />
    <FilterSelect
      label={getTranslation(language, 'model', 'Model')}
      value={filters.model}
      options={
        filters.make === getTranslation(language, 'allMakes', 'All Makes')
          ? [getTranslation(language, 'allModels', 'All Models')]
          : [getTranslation(language, 'allModels', 'All Models'), ...(carModels[filters.make] || [])]
      }
      onChange={(value) => onFilterChange('model', value)}
    />
    <RangeFilter
      label={getTranslation(language, 'yearRange', 'Year Range')}
      min={1990}
      max={new Date().getFullYear()}
      value={[filters.minYear, filters.maxYear]}
      onChange={([min, max]) => {
        onFilterChange('minYear', min);
        onFilterChange('maxYear', max);
      }}
      unit="year"
      icon={Calendar}
    />
    <RangeFilter
      label={getTranslation(language, 'priceRange', 'Price Range')}
      min={0}
      max={maxPriceInData}
      value={[filters.minPrice, filters.maxPrice]}
      onChange={([min, max]) => {
        onFilterChange('minPrice', min);
        onFilterChange('maxPrice', max);
      }}
      unit="OMR"
      icon={DollarSign}
    />
    <FilterSelect
      label={getTranslation(language, 'transmission', 'Transmission')}
      value={filters.transmission}
      options={['all', ...transmissionTypes]}
      onChange={(value) => onFilterChange('transmission', value)}
    />
    <FilterSelect
      label={getTranslation(language, 'fuelType', 'Fuel Type')}
      value={filters.fuelType}
      options={['all', ...fuelTypes]}
      onChange={(value) => onFilterChange('fuelType', value)}
    />
  </div>
);