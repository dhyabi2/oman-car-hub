import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const CarsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || 'All Makes';
  const initialModel = searchParams.get('model') || 'All Models';

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
    const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    setCars(storedCars);
    setFilteredCars(storedCars);
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => 
      (filters.make === 'All Makes' || car.make === filters.make) &&
      (filters.model === 'All Models' || car.model === filters.model) &&
      car.year >= filters.minYear &&
      car.year <= filters.maxYear &&
      car.price >= filters.minPrice &&
      car.price <= filters.maxPrice &&
      (filters.transmission === 'all' || car.transmission === filters.transmission) &&
      (filters.fuelType === 'all' || car.fuel_type === filters.fuelType)
    );
    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      if (name === 'make') {
        newFilters.model = 'All Models';
      }
      return newFilters;
    });
  };

  const carMakes = ['All Makes', ...new Set(cars.map(car => car.make))];
  const carModels = filters.make === 'All Makes' 
    ? ['All Models'] 
    : ['All Models', ...new Set(cars.filter(car => car.make === filters.make).map(car => car.model))];

  const maxPriceInData = Math.max(...cars.map(car => car.price), 100000);

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  const renderCarImage = (photo) => {
    if (typeof photo === 'string') {
      if (photo.startsWith('data:image')) {
        return photo; // It's a base64 encoded image
      } else if (photo.startsWith('http')) {
        return photo; // It's a URL
      }
    }
    return '/placeholder.svg'; // Fallback to placeholder
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cars List</h1>
      
      <FiltersCard
        filters={filters}
        carMakes={carMakes}
        carModels={carModels}
        maxPriceInData={maxPriceInData}
        onFilterChange={handleFilterChange}
      />

      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={handleViewDetails} 
              renderCarImage={renderCarImage} 
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const FiltersCard = ({ filters, carMakes, carModels, maxPriceInData, onFilterChange }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>Filters</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterSelect
          label="Make"
          value={filters.make}
          options={carMakes}
          onChange={(value) => onFilterChange('make', value)}
        />
        <FilterSelect
          label="Model"
          value={filters.model}
          options={carModels}
          onChange={(value) => onFilterChange('model', value)}
        />
        <YearRangeFilter
          minYear={filters.minYear}
          maxYear={filters.maxYear}
          onChange={onFilterChange}
        />
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          maxPriceInData={maxPriceInData}
          onChange={onFilterChange}
        />
        <FilterSelect
          label="Transmission"
          value={filters.transmission}
          options={['all', 'Automatic', 'Manual', 'CVT']}
          onChange={(value) => onFilterChange('transmission', value)}
        />
        <FilterSelect
          label="Fuel Type"
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

const YearRangeFilter = ({ minYear, maxYear, onChange }) => (
  <div>
    <Label>Year Range</Label>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={minYear}
        onChange={(e) => onChange('minYear', parseInt(e.target.value))}
        className="w-20"
      />
      <span>to</span>
      <Input
        type="number"
        value={maxYear}
        onChange={(e) => onChange('maxYear', parseInt(e.target.value))}
        className="w-20"
      />
    </div>
  </div>
);

const PriceRangeFilter = ({ minPrice, maxPrice, maxPriceInData, onChange }) => (
  <div>
    <Label>Price Range (OMR)</Label>
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

const CarCard = ({ car, onViewDetails, renderCarImage }) => (
  <Card className="overflow-hidden">
    {car.photos && car.photos.length > 0 && (
      <img 
        src={renderCarImage(car.photos[0])}
        alt={`${car.make} ${car.model}`} 
        className="w-full h-48 object-cover"
      />
    )}
    {car.photos && car.photos.length > 1 && (
      <div className="flex overflow-x-auto p-2">
        {car.photos.slice(1).map((photo, index) => (
          <img 
            key={index} 
            src={renderCarImage(photo)}
            alt={`${car.make} ${car.model} thumbnail ${index + 1}`} 
            className="w-16 h-16 object-cover mr-2 flex-shrink-0"
          />
        ))}
      </div>
    )}
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
      <p className="text-gray-600 mb-2">Price: {car.price} OMR</p>
      <p className="text-gray-600 mb-2">Mileage: {car.mileage} km</p>
      <p className="text-gray-600 mb-2">Transmission: {car.transmission}</p>
      <p className="text-gray-600 mb-2">Fuel Type: {car.fuel_type}</p>
      <Button className="w-full mt-2" onClick={() => onViewDetails(car.id)}>View Details</Button>
    </CardContent>
  </Card>
);

export default CarsList;