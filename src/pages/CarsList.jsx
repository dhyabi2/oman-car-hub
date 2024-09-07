import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars, toggleFavoriteCar, isFavoriteCar } from '../utils/indexedDB';
import { NoCarsList, CarCard, FiltersCard } from './CarsListComponents';
import { translations } from '../utils/translations';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        make: getTranslation(language, 'allMakes', 'All Makes'),
        model: getTranslation(language, 'allModels', 'All Models'),
      }));

      // Fetch favorite status for each car
      const favoritesStatus = {};
      for (const car of allCars) {
        favoritesStatus[car.id] = await isFavoriteCar(car.id);
      }
      setFavorites(favoritesStatus);
    };
    fetchCars();
  }, [language]);

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
      <h1 className="text-3xl font-bold mb-6">{getTranslation(language, 'carsList', 'Cars List')}</h1>
      
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="mb-4 w-full">
            {isFiltersOpen ? (
              <>
                {getTranslation(language, 'hideFilters', 'Hide Filters')} <ChevronUp className="ml-2" />
              </>
            ) : (
              <>
                {getTranslation(language, 'showFilters', 'Show Filters')} <ChevronDown className="ml-2" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <FiltersCard
            filters={filters}
            carMakes={[getTranslation(language, 'allMakes', 'All Makes'), ...carMakes]}
            carModels={filters.make === getTranslation(language, 'allMakes', 'All Makes') ? [getTranslation(language, 'allModels', 'All Models')] : [getTranslation(language, 'allModels', 'All Models'), ...(carModels[filters.make] || [])]}
            maxPriceInData={Math.max(...cars.map(car => car.price), 100000)}
            onFilterChange={handleFilterChange}
            language={language}
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
                language={language}
                isFavorite={favorites[car.id]}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <NoCarsList language={language} />
      )}
    </div>
  );
};

export default CarsList;