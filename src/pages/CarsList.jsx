import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars } from '../utils/indexedDB';

const CarsList = ({ t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || t('allMakes');
  const initialModel = searchParams.get('model') || t('allModels');

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    make: initialMake,
    model: initialModel,
    minYear: 1990,
    maxYear: new Date().getFullYear(),
    minPrice: 0,
    maxPrice: 100000,
    transmission: 'all',
    fuelType: 'all',
  });

  useEffect(() => {
    const fetchCars = async () => {
      const allCars = await getAllCars();
      setCars(allCars);
      setFilteredCars(allCars);
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => 
      (filters.make === t('allMakes') || car.make === filters.make) &&
      (filters.model === t('allModels') || car.model === filters.model) &&
      car.year >= filters.minYear &&
      car.year <= filters.maxYear &&
      car.price >= filters.minPrice &&
      car.price <= filters.maxPrice &&
      (filters.transmission === 'all' || car.transmission === filters.transmission) &&
      (filters.fuelType === 'all' || car.fuel_type === filters.fuelType)
    );
    setFilteredCars(filtered);
  }, [filters, cars, t]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      if (name === 'make') {
        newFilters.model = t('allModels');
      }
      return newFilters;
    });
  };

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('carsList')}</h1>
      
      <FiltersCard
        filters={filters}
        carMakes={[t('allMakes'), ...carMakes]}
        carModels={filters.make === t('allMakes') ? [t('allModels')] : [t('allModels'), ...(carModels[filters.make] || [])]}
        maxPriceInData={Math.max(...cars.map(car => car.price), 100000)}
        onFilterChange={handleFilterChange}
        t={t}
      />

      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={handleViewDetails}
              t={t}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const FiltersCard = ({ filters, carMakes, carModels, maxPriceInData, onFilterChange, t }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{t('filters')}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterSelect
          label={t('make')}
          value={filters.make}
          options={carMakes}
          onChange={(value) => onFilterChange('make', value)}
        />
        <FilterSelect
          label={t('model')}
          value={filters.model}
          options={carModels}
          onChange={(value) => onFilterChange('model', value)}
        />
        <YearRangeFilter
          minYear={filters.minYear}
          maxYear={filters.maxYear}
          onChange={onFilterChange}
          t={t}
        />
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          maxPriceInData={maxPriceInData}
          onChange={onFilterChange}
          t={t}
        />
        <FilterSelect
          label={t('transmission')}
          value={filters.transmission}
          options={['all', 'Automatic', 'Manual', 'CVT']}
          onChange={(value) => onFilterChange('transmission', value)}
        />
        <FilterSelect
          label={t('fuelType')}
          value={filters.fuelType}
          options={['all', 'Petrol', 'Diesel', 'Electric', 'Hybrid']}
          onChange={(value) => onFilterChange('fuelType', value)}
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

const YearRangeFilter = ({ minYear, maxYear, onChange, t }) => (
  <div>
    <Label>{t('yearRange')}</Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minYear}
        onChange={(e) => onChange('minYear', parseInt(e.target.value))}
        className="w-20"
      />
      <span>{t('to')}</span>
      <Input
        type="number"
        value={maxYear}
        onChange={(e) => onChange('maxYear', parseInt(e.target.value))}
        className="w-20"
      />
    </div>
  </div>
);

const PriceRangeFilter = ({ minPrice, maxPrice, maxPriceInData, onChange, t }) => (
  <div>
    <Label>{t('priceRange')} (OMR)</Label>
    <Slider
      min={0}
      max={maxPriceInData}
      step={1000}
      value={[minPrice, maxPrice]}
      onValueChange={(value) => {
        onChange('minPrice', value[0]);
        onChange('maxPrice', value[1]);
      }}
    />
    <div className="flex justify-between mt-2">
      <span>{minPrice} OMR</span>
      <span>{maxPrice} OMR</span>
    </div>
  </div>
);

const CarCard = ({ car, onViewDetails, t }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
      <p className="text-gray-600 mb-2">{t('price')}: {car.price} OMR</p>
      <p className="text-gray-600 mb-2">{t('mileage')}: {car.mileage} km</p>
      <p className="text-gray-600 mb-2">{t('transmission')}: {car.transmission}</p>
      <p className="text-gray-600 mb-2">{t('fuelType')}: {car.fuel_type}</p>
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
      <Button className="w-full mt-2" onClick={() => onViewDetails(car.id)}>{t('viewDetails')}</Button>
    </CardContent>
  </Card>
);

export default CarsList;