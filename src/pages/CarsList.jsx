import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const carBrands = [
  // ... (keep the entire carBrands array as it was)
];

const CarsList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || 'all';
  const initialModel = searchParams.get('model') || 'all';

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
    // Simulating API call to fetch cars
    const fetchCars = async () => {
      // In a real application, this would be an API call
      const mockCars = [
        { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 25000, transmission: 'Automatic', fuelType: 'Petrol', mileage: 30000, photos: ['https://example.com/toyota-camry-1.jpg', 'https://example.com/toyota-camry-2.jpg', 'https://example.com/toyota-camry-3.jpg'] },
        { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: 22000, transmission: 'Manual', fuelType: 'Petrol', mileage: 35000, photos: ['https://example.com/honda-civic-1.jpg', 'https://example.com/honda-civic-2.jpg'] },
        { id: 3, make: 'Ford', model: 'F-150', year: 2021, price: 35000, transmission: 'Automatic', fuelType: 'Diesel', mileage: 20000, photos: ['https://example.com/ford-f150-1.jpg', 'https://example.com/ford-f150-2.jpg', 'https://example.com/ford-f150-3.jpg', 'https://example.com/ford-f150-4.jpg'] },
        { id: 4, make: 'Tesla', model: 'Model 3', year: 2022, price: 45000, transmission: 'Automatic', fuelType: 'Electric', mileage: 10000, photos: ['https://example.com/tesla-model3-1.jpg', 'https://example.com/tesla-model3-2.jpg'] },
        { id: 5, make: 'BMW', model: 'X5', year: 2020, price: 55000, transmission: 'Automatic', fuelType: 'Hybrid', mileage: 25000, photos: ['https://example.com/bmw-x5-1.jpg', 'https://example.com/bmw-x5-2.jpg', 'https://example.com/bmw-x5-3.jpg'] },
      ];
      setCars(mockCars);
      setFilteredCars(mockCars);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => 
      (filters.make === 'all' || car.make === filters.make) &&
      (filters.model === 'all' || car.model === filters.model) &&
      car.year >= filters.minYear &&
      car.year <= filters.maxYear &&
      car.price >= filters.minPrice &&
      car.price <= filters.maxPrice &&
      (filters.transmission === 'all' || car.transmission === filters.transmission) &&
      (filters.fuelType === 'all' || car.fuelType === filters.fuelType)
    );
    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      // Reset model when make changes
      if (name === 'make') {
        newFilters.model = 'all';
      }
      return newFilters;
    });
  };

  const carMakes = ['all', ...new Set(carBrands.map(brand => brand.brand))];
  const carModels = filters.make === 'all' ? ['all'] : ['all', ...(carBrands.find(brand => brand.brand === filters.make)?.models || [])];

  const maxPriceInData = Math.max(...cars.map(car => car.price), 100000);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cars List</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="make">Make</Label>
              <Select value={filters.make} onValueChange={(value) => handleFilterChange('make', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make} value={make}>{make === 'all' ? 'All Makes' : make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Select value={filters.model} onValueChange={(value) => handleFilterChange('model', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {carModels.map((model) => (
                    <SelectItem key={model} value={model}>{model === 'all' ? 'All Models' : model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Year Range</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={filters.minYear}
                  onChange={(e) => handleFilterChange('minYear', parseInt(e.target.value))}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  type="number"
                  value={filters.maxYear}
                  onChange={(e) => handleFilterChange('maxYear', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
            <div>
              <Label>Price Range (OMR)</Label>
              <Slider
                min={0}
                max={maxPriceInData}
                step={1000}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={(value) => {
                  handleFilterChange('minPrice', value[0]);
                  handleFilterChange('maxPrice', value[1]);
                }}
              />
              <div className="flex justify-between mt-2">
                <span>{filters.minPrice} OMR</span>
                <span>{filters.maxPrice} OMR</span>
              </div>
            </div>
            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <Select value={filters.transmission} onValueChange={(value) => handleFilterChange('transmission', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="CVT">CVT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              {car.photos && car.photos.length > 0 && (
                <img src={car.photos[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
              )}
              {car.photos && car.photos.length > 1 && (
                <div className="flex overflow-x-auto p-2">
                  {car.photos.slice(1).map((photo, index) => (
                    <img key={index} src={photo} alt={`${car.make} ${car.model} thumbnail ${index + 1}`} className="w-16 h-16 object-cover mr-2 flex-shrink-0" />
                  ))}
                </div>
              )}
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
                <p className="text-gray-600 mb-2">Price: {car.price} OMR</p>
                <p className="text-gray-600 mb-2">Mileage: {car.mileage} km</p>
                <p className="text-gray-600 mb-2">Transmission: {car.transmission}</p>
                <p className="text-gray-600 mb-2">Fuel Type: {car.fuelType}</p>
                <Button className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CarsList;