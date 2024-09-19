import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { carMakes, carModels } from '../utils/carData';
import { getAllCars, toggleFavoriteCar, isFavoriteCar } from '../utils/indexedDB';
import { CarCard, FiltersCard } from './CarsListComponents';
import { translations } from '../utils/translations';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const ITEMS_PER_PAGE = 20;

const CarsList = ({ language = 'en' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMake = searchParams.get('make') || translations[language].allMakes;
  const initialModel = searchParams.get('model') || translations[language].allModels;

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

  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    const fetchCars = async () => {
      const allCars = await getAllCars();
      setCars(allCars);
      updateFiltersWithCarData(allCars);
      updateFavoritesStatus(allCars);
    };
    fetchCars();
  }, [language]);

  useEffect(() => {
    const filtered = filterCars();
    setFilteredCars(filtered);
    resetPagination();
  }, [filters, cars, language]);

  useEffect(() => {
    loadMoreCars();
  }, [page, filteredCars]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  const updateFiltersWithCarData = (allCars) => {
    const maxPrice = Math.max(...allCars.map(car => car.price), 100000);
    const maxMileage = Math.max(...allCars.map(car => car.mileage), 1000000);
    setFilters(prev => ({
      ...prev,
      maxPrice,
      maxMileage,
      make: translations[language].allMakes,
      model: translations[language].allModels,
    }));
  };

  const updateFavoritesStatus = async (allCars) => {
    const favoritesStatus = {};
    for (const car of allCars) {
      favoritesStatus[car.id] = await isFavoriteCar(car.id);
    }
    setFavorites(favoritesStatus);
  };

  const filterCars = () => cars.filter(car => 
    (filters.make === translations[language].allMakes || car.make === filters.make) &&
    (filters.model === translations[language].allModels || car.model === filters.model) &&
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

  const resetPagination = () => {
    setPage(1);
    setHasMore(true);
    setDisplayedCars([]);
  };

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
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'make' && { model: translations[language].allModels }),
    }));
    setDisplayedCars([]);
  };

  const handleViewDetails = (carId) => navigate(`/car/${carId}`);

  const handleToggleFavorite = async (carId) => {
    const newFavoriteStatus = await toggleFavoriteCar(carId);
    setFavorites(prev => ({ ...prev, [carId]: newFavoriteStatus }));
  };

  const NoCarsList = () => (
    <div className="text-center py-10">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
        <AlertCircle className="mr-2" />
        {translations[language].noCarsFound}
      </h2>
      <p>
        {language === 'ar'
          ? "حاول تعديل المرشحات أو معايير البحث الخاصة بك"
          : "Try adjusting your filters or search criteria"}
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translations[language].carsList}</h1>
      
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="mb-4 w-full">
            {isFiltersOpen ? (
              <>
                {translations[language].hideFilters} <ChevronUp className="ml-2" />
              </>
            ) : (
              <>
                {translations[language].showFilters} <ChevronDown className="ml-2" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <FiltersCard
            filters={filters}
            carMakes={[translations[language].allMakes, ...carMakes]}
            carModels={filters.make === translations[language].allMakes ? [translations[language].allModels] : [translations[language].allModels, ...(carModels[filters.make] || [])]}
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
        <NoCarsList />
      )}
      
      {hasMore && <div ref={ref} className="h-10 mt-4"></div>}
    </div>
  );
};

export default CarsList;
