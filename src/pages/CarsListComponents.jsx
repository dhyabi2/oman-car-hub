// Latest modification: Added comment line for latest modification

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, DollarSign, Calendar, Car, Fuel, Sliders, Eye, Phone, MessageCircle, Heart, MapPin, Share2 } from 'lucide-react';
import { carMakes, carModels, fuelTypes, transmissionTypes } from '../utils/carData';
import { translations } from '../utils/translations';
import { toast } from "sonner";
import { addReferralToUrl } from '../utils/referral';

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

export const CarCard = ({ car, onViewDetails, language, isFavorite, onToggleFavorite }) => {
  const handleShare = () => {
    const shareUrl = addReferralToUrl(`${window.location.origin}/car/${car.id}`);
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success(getTranslation(language, 'linkCopied', 'Link copied to clipboard!'));
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        toast.error(getTranslation(language, 'copyFailed', 'Failed to copy link'));
      });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[56.25%]">
        <img
          src={car.photos[0]}
          alt={`${car.make} ${car.model}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
          onClick={() => onToggleFavorite(car.id)}
        >
          <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-2xl font-bold text-white mb-1">{car.year} {car.make} {car.model}</h2>
          <p className="text-3xl font-bold text-yellow-400">{car.price} {getTranslation(language, 'currency', 'OMR')}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <p className="flex items-center"><Car className="mr-1 text-blue-500" /> {car.mileage} km</p>
          <p className="flex items-center"><Sliders className="mr-1 text-green-500" /> {car.transmission}</p>
          <p className="flex items-center"><Fuel className="mr-1 text-red-500" /> {car.fuel_type}</p>
          <p className="flex items-center"><Calendar className="mr-1 text-purple-500" /> {car.year}</p>
          <p className="flex items-center col-span-2"><MapPin className="mr-1 text-indigo-500" /> {car.location}</p>
        </div>
        <div className="flex justify-between items-center">
          <Button className="flex-1 mr-2" onClick={() => onViewDetails(car.id)}>
            <Eye className="mr-2" />
            {getTranslation(language, 'viewDetails', 'View Details')}
          </Button>
          <div className="flex space-x-2">
            <Button
              size="icon"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => window.open(`https://wa.me/968${car.contact_phone}`, '_blank')}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => window.open(`tel:${car.contact_phone}`, '_blank')}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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