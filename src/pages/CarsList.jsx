import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars, toggleFavoriteCar, isFavoriteCar } from '../utils/indexedDB';
import { NoCarsList, CarCard, FiltersCard } from './CarsListComponents';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CarsList = ({ language = 'en', t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || t.allMakes;
  const initialModel = searchParams.get('model') || t.allModels;

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState({});
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
        make: t.allMakes,
        model: t.allModels,
      }));

      const favoritesStatus = {};
      for (const car of allCars) {
        favoritesStatus[car.id] = await isFavoriteCar(car.id);
      }
      setFavorites(favoritesStatus);
    };
    fetchCars();
  }, [t]);

  useEffect(() => {
    const filtered = cars.filter(car => 
      (filters.make === t.allMakes || car.make === filters.make) &&
      (filters.model === t.allModels || car.model === filters.model) &&
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

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleToggleFavorite = async (carId) => {
    const newFavoriteStatus = await toggleFavoriteCar(carId);
    setFavorites(prev => ({
      ...prev,
      [carId]: newFavoriteStatus
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t.carsList}</h1>
      
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="mb-4 w-full">
            {isFiltersOpen ? (
              <>
                {t.hideFilters} <ChevronUp className="ml-2" />
              </>
            ) : (
              <>
                {t.showFilters} <ChevronDown className="ml-2" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <FiltersCard
            filters={filters}
            carMakes={[t.allMakes, ...carMakes]}
            carModels={filters.make === t.allMakes ? [t.allModels] : [t.allModels, ...(carModels[filters.make] || [])]}
            maxPriceInData={Math.max(...cars.map(car => car.price), 100000)}
            onFilterChange={handleFilterChange}
            t={t}
          />
        </CollapsibleContent>
      </Collapsible>

      {filteredCars.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CarCard 
                car={car} 
                onViewDetails={handleViewDetails}
                t={t}
                isFavorite={favorites[car.id]}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <NoCarsList t={t} />
      )}
    </div>
  );
};

export default CarsList;