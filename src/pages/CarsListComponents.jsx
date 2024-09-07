import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, DollarSign, Calendar, Car, Fuel, Sliders, Eye, Phone, MessageCircle, Heart, MapPin } from 'lucide-react';
import { carMakes, carModels, fuelTypes, transmissionTypes } from '../utils/carData';

const FilterSelect = ({ label, value, options, onChange, t }) => (
  <div>
    <Label htmlFor={label}>{t[label.toLowerCase()] || label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t.select + ' ' + (t[label.toLowerCase()] || label)} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{t[option.toLowerCase()] || option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const RangeFilter = ({ label, min, max, value, onChange, unit, icon: Icon, t }) => (
  <div>
    <Label className="flex items-center">
      {Icon && <Icon className="mr-2" />}
      {t[label.toLowerCase()] || label} ({unit})
    </Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={value[0]}
        onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
        className="w-20"
      />
      <span>{t.to}</span>
      <Input
        type="number"
        value={value[1]}
        onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
        className="w-20"
      />
    </div>
  </div>
);

export const NoCarsList = ({ t }) => (
  <div className="text-center py-10">
    <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
      <AlertCircle className="mr-2" />
      {t.noCarsFound}
    </h2>
    <p>{t.tryDifferentFilters}</p>
  </div>
);

export const CarCard = ({ car, onViewDetails, t, isFavorite, onToggleFavorite }) => (
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
        <p className="text-3xl font-bold text-yellow-400">{car.price} {t.currency}</p>
      </div>
    </div>
    <CardContent className="p-4">
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <p className="flex items-center"><Car className="mr-1 text-blue-500" /> {car.mileage} {t.km}</p>
        <p className="flex items-center"><Sliders className="mr-1 text-green-500" /> {t[car.transmission.toLowerCase()]}</p>
        <p className="flex items-center"><Fuel className="mr-1 text-red-500" /> {t[car.fuel_type.toLowerCase()]}</p>
        <p className="flex items-center"><Calendar className="mr-1 text-purple-500" /> {car.year}</p>
        <p className="flex items-center col-span-2"><MapPin className="mr-1 text-indigo-500" /> {t[car.location.toLowerCase()] || car.location}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={() => window.open(`https://wa.me/${car.contact_phone}`, '_blank')}>
          <MessageCircle className="mr-2" />
          {t.whatsappButton}
        </Button>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => window.open(`tel:${car.contact_phone}`)}>
          <Phone className="mr-2" />
          {t.callButton}
        </Button>
        <Button className="w-full" onClick={() => onViewDetails(car.id)}>
          <Eye className="mr-2" />
          {t.viewDetails}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const FiltersCard = ({ filters, maxPriceInData, onFilterChange, t }) => (
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
      t={t}
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
      t={t}
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
  </div>
);