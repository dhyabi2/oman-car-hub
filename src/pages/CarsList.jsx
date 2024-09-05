import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars } from '../utils/indexedDB';
import { NoCarsList, CarCard, FiltersCard } from './CarsListComponents';

const CarsList = ({ t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || t.allMakes;
  const initialModel = searchParams.get('model') || t.allModels;

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
      (filters.make === t.allMakes || car.make === filters.make) &&
      (filters.model === t.allModels || car.model === filters.model) &&
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
        newFilters.model = t.allModels;
      }
      return newFilters;
    });
  };

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t.carsList}</h1>
      
      <FiltersCard
        filters={filters}
        carMakes={[t.allMakes, ...carMakes]}
        carModels={filters.make === t.allMakes ? [t.allModels] : [t.allModels, ...(carModels[filters.make] || [])]}
        maxPriceInData={Math.max(...cars.map(car => car.price), 100000)}
        onFilterChange={handleFilterChange}
        t={t}
      />

      <ScrollArea className="h-[calc(100vh-20rem)]">
        {filteredCars.length > 0 ? (
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
        ) : (
          <NoCarsList t={t} />
        )}
      </ScrollArea>
    </div>
  );
};

export default CarsList;