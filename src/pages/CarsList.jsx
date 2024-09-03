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
  const initialMake = searchParams.get('make') || '';
  const initialModel = searchParams.get('model') || '';

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
                    <SelectItem key={make} value={make}>{make}</SelectItem>
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
                    <SelectItem key={model} value={model}>{model}</SelectItem>
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
                <img 
                  src={URL.createObjectURL(car.photos[0])} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-full h-48 object-cover"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
              )}
              {car.photos && car.photos.length > 1 && (
                <div className="flex overflow-x-auto p-2">
                  {car.photos.slice(1).map((photo, index) => (
                    <img 
                      key={index} 
                      src={URL.createObjectURL(photo)} 
                      alt={`${car.make} ${car.model} thumbnail ${index + 1}`} 
                      className="w-16 h-16 object-cover mr-2 flex-shrink-0"
                      onLoad={(e) => URL.revokeObjectURL(e.target.src)}
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
                <Button className="w-full mt-2" onClick={() => handleViewDetails(car.id)}>View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CarsList;