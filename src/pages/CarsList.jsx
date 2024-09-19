import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars, toggleFavoriteCar, isFavoriteCar } from '../utils/indexedDB';
import { NoCarsList, CarCard, FiltersCard } from './CarsListComponents';
import { translations } from '../utils/translations';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const getTranslation = (language, key, fallback = key) => {
  return translations[language]?.[key] || fallback;
};

const ITEMS_PER_PAGE = 20;

const CarsList = ({ language = 'en' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || getTranslation(language, 'allMakes', 'All Makes');
  const initialModel = searchParams.get('model') || getTranslation(language, 'allModels', 'All Models');

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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

  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const fetchCars = async () => {
      const allCars = await getAllCars();
      setCars(allCars);
      const maxPrice = Math.max(...allCars.map(car => car.price), 100000);
      const maxMileage = Math.max(...allCars.map(car => car.mileage), 1000000);
      setFilters(prev => ({
        ...prev,
        maxPrice,
        maxMileage,
        make: getTranslation(language, 'allMakes', 'All Makes'),
        model: getTranslation(language, 'allModels', 'All Models'),
      }));

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
    setPage(1);
    setHasMore(true);
    setDisplayedCars([]);
  }, [filters, cars, language]);

  useEffect(() => {
    loadMoreCars();
  }, [page, filteredCars]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  const loadMoreCars = useCallback(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newCars = filteredCars.slice(startIndex, endIndex);
    
    if (newCars.length === 0) {
      setHasMore(false);
    } else {
      setDisplayedCars(prevCars => [...prevCars, ...newCars]);
    }
  }, [page, filteredCars]);

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

      {displayedCars.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedCars.map((car, index) => (
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
      
      {hasMore && (
        <div ref={ref} className="h-10 mt-4"></div>
      )}
    </div>
  );
};

export default CarsList;
