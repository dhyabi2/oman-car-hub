import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
      <p className="text-gray-600 mb-2 flex items-center">
        <DollarSign className="mr-1" /> 
        {getTranslation(language, 'price', 'Price')}: {car.price} OMR
      </p>
      <p className="text-gray-600 mb-2 flex items-center">
        <Car className="mr-1" /> 
        {getTranslation(language, 'mileage', 'Mileage')}: {car.mileage} km
      </p>
      <p className="text-gray-600 mb-2 flex items-center">
        <Sliders className="mr-1" /> 
        {getTranslation(language, 'transmission', 'Transmission')}: {car.transmission}
      </p>
      <p className="text-gray-600 mb-2 flex items-center">
        <Fuel className="mr-1" /> 
        {getTranslation(language, 'fuelType', 'Fuel Type')}: {car.fuel_type}
      </p>
      <CarImages car={car} />
      <Button className="w-full mt-2 flex items-center justify-center" onClick={() => onViewDetails(car.id)}>
        <Eye className="mr-2" />
        {getTranslation(language, 'viewDetails', 'View Details')}
      </Button>
    </CardContent>
  </Card>
);

const CarImages = ({ car }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {car.photos.slice(0, 4).map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt={`${car.make} ${car.model}`}
        className="w-16 h-16 object-cover rounded"
      />
    ))}
    {car.photos.length > 4 && (
      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-sm font-semibold">
        +{car.photos.length - 4}
      </div>
    )}
  </div>
);

export const FiltersCard = ({ filters, maxPriceInData, onFilterChange, language }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center">
        <Sliders className="mr-2" />
        {getTranslation(language, 'filters', 'Filters')}
      </CardTitle>
    </CardHeader>
    <CardContent>
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
        <YearRangeFilter
          minYear={filters.minYear}
          maxYear={filters.maxYear}
          onChange={onFilterChange}
          language={language}
        />
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          maxPriceInData={maxPriceInData}
          onChange={onFilterChange}
          language={language}
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
        <FilterSelect
          label={getTranslation(language, 'color', 'Color')}
          value={filters.color}
          options={['all', ...colors]}
          onChange={(value) => onFilterChange('color', value)}
        />
        <MileageRangeFilter
          minMileage={filters.minMileage}
          maxMileage={filters.maxMileage}
          onChange={onFilterChange}
          language={language}
        />
        <FilterSelect
          label={getTranslation(language, 'condition', 'Condition')}
          value={filters.condition}
          options={['all', 'New', 'Used']}
          onChange={(value) => onFilterChange('condition', value)}
        />
        <FilterSelect
          label={getTranslation(language, 'location', 'Location')}
          value={filters.location}
          options={['all', ...locations]}
          onChange={(value) => onFilterChange('location', value)}
        />
        <FilterSelect
          label={getTranslation(language, 'numberOfDoors', 'Number of Doors')}
          value={filters.numberOfDoors}
          options={['all', '2', '3', '4', '5']}
          onChange={(value) => onFilterChange('numberOfDoors', value)}
        />
        <FilterSelect
          label={getTranslation(language, 'numberOfSeats', 'Number of Seats')}
          value={filters.numberOfSeats}
          options={['all', '2', '4', '5', '7', '8']}
          onChange={(value) => onFilterChange('numberOfSeats', value)}
        />
        <FilterSelect
          label={getTranslation(language, 'drivetrain', 'Drivetrain')}
          value={filters.drivetrain}
          options={['all', 'FWD', 'RWD', 'AWD', '4WD']}
          onChange={(value) => onFilterChange('drivetrain', value)}
        />
      </div>
    </CardContent>
  </Card>
);

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

const YearRangeFilter = ({ minYear, maxYear, onChange, language }) => (
  <div>
    <Label className="flex items-center">
      <Calendar className="mr-2" />
      {getTranslation(language, 'yearRange', 'Year Range')}
    </Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minYear}
        onChange={(e) => onChange('minYear', parseInt(e.target.value))}
        className="w-20"
      />
      <span>{getTranslation(language, 'to', 'to')}</span>
      <Input
        type="number"
        value={maxYear}
        onChange={(e) => onChange('maxYear', parseInt(e.target.value))}
        className="w-20"
      />
    </div>
  </div>
);

const PriceRangeFilter = ({ minPrice, maxPrice, maxPriceInData, onChange, language }) => (
  <div>
    <Label className="flex items-center">
      <DollarSign className="mr-2" />
      {getTranslation(language, 'priceRange', 'Price Range')} (OMR)
    </Label>
    <div className="mt-2">
      <Slider
        min={0}
        max={maxPriceInData}
        step={100}
        value={[minPrice, maxPrice]}
        onValueChange={(value) => {
          onChange('minPrice', value[0]);
          onChange('maxPrice', value[1]);
        }}
        className="w-full"
      />
    </div>
    <div className="flex justify-between mt-2">
      <span>{minPrice} OMR</span>
      <span>{maxPrice} OMR</span>
    </div>
  </div>
);

const MileageRangeFilter = ({ minMileage, maxMileage, onChange, language }) => (
  <div>
    <Label className="flex items-center">
      <Car className="mr-1" />
      {getTranslation(language, 'mileageRange', 'Mileage Range')} (km)
    </Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minMileage}
        onChange={(e) => onChange('minMileage', parseInt(e.target.value))}
        className="w-24"
      />
      <span>{getTranslation(language, 'to', 'to')}</span>
      <Input
        type="number"
        value={maxMileage}
        onChange={(e) => onChange('maxMileage', parseInt(e.target.value))}
        className="w-24"
      />
    </div>
  </div>
);