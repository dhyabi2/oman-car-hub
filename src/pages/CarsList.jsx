import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars } from '../utils/indexedDB';
import { NoCarsList, CarCard, FiltersCard } from './CarsListComponents';
import { translations } from '../utils/translations';

const getTranslation = (language, key, fallback = key) => {
  return translations[language]?.[key] || fallback;
};

const CarsList = ({ language = 'en' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || getTranslation(language, 'allMakes', 'All Makes');
  const initialModel = searchParams.get('model') || getTranslation(language, 'allModels', 'All Models');

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
    color: 'all',
    minMileage: 0,
    maxMileage: 1000000,
    condition: 'all',
    location: 'all',
    numberOfDoors: 'all',
    numberOfSeats: 'all',
    drivetrain: 'all',
  });

  useEffect(() => {
    const fetchCars = async () => {
      const allCars = await getAllCars();
      setCars(allCars);
      setFilteredCars(allCars);
      const maxPrice = Math.max(...allCars.map(car => car.price), 100000);
      const maxMileage = Math.max(...allCars.map(car => car.mileage), 1000000);
      setFilters(prev => ({
        ...prev,
        maxPrice,
        maxMileage,
      }));
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => 
      (filters.make === getTranslation(language, 'allMakes', 'All Makes') || car.make === filters.make) &&
      (filters.model === getTranslation(language, 'allModels', 'All Models') || car.model === filters.model) &&
      car.year >= filters.minYear &&
      car.year <= filters.maxYear &&
      car.price >= filters.minPrice &&
      car.price <= filters.maxPrice &&
      (filters.transmission === 'all' || car.transmission === filters.transmission) &&
      (filters.fuelType === 'all' || car.fuel_type === filters.fuelType) &&
      (filters.color === 'all' || car.color === filters.color) &&
      car.mileage >= filters.minMileage &&
      car.mileage <= filters.maxMileage &&
      (filters.condition === 'all' || car.condition === filters.condition) &&
      (filters.location === 'all' || car.location === filters.location) &&
      (filters.numberOfDoors === 'all' || car.number_of_doors.toString() === filters.numberOfDoors) &&
      (filters.numberOfSeats === 'all' || car.number_of_seats.toString() === filters.numberOfSeats) &&
      (filters.drivetrain === 'all' || car.drivetrain === filters.drivetrain)
    );
    setFilteredCars(filtered);
  }, [filters, cars, language]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      if (name === 'make') {
        newFilters.model = getTranslation(language, 'allModels', 'All Models');
      }
      return newFilters;
    });
  };

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{getTranslation(language, 'carsList', 'Cars List')}</h1>
      
      <FiltersCard
        filters={filters}
        carMakes={[getTranslation(language, 'allMakes', 'All Makes'), ...carMakes]}
        carModels={filters.make === getTranslation(language, 'allMakes', 'All Makes') ? [getTranslation(language, 'allModels', 'All Models')] : [getTranslation(language, 'allModels', 'All Models'), ...(carModels[filters.make] || [])]}
        maxPriceInData={Math.max(...cars.map(car => car.price), 100000)}
        onFilterChange={handleFilterChange}
        language={language}
      />

      <ScrollArea className="h-[calc(100vh-20rem)]">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard 
                key={car.id} 
                car={car} 
                onViewDetails={handleViewDetails}
                language={language}
              />
            ))}
          </div>
        ) : (
          <NoCarsList language={language} />
        )}
      </ScrollArea>
    </div>
  );
};

export default CarsList;