import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { carBrands } from '../utils/carData';
import { getCarStatistics } from '../utils/indexedDB';
import { QuickStats, BrandSelector, ModelSelector, SelectedCar, LatestCar, SellYourCar } from './IndexComponents';
import LoadingAnimation from '../components/LoadingAnimation';

const Index = ({ language, t }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(carBrands);
  const [latestCar, setLatestCar] = useState(null);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeSellers: 0,
    averagePrice: 0,
    mostPopularBrand: '',
    mostExpensiveCar: '',
    newestListing: '',
    totalValue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const modelSelectorRef = useRef(null);

  useEffect(() => {
    const filtered = carBrands.filter(brand => 
      brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const statistics = await getCarStatistics();
        setStats(statistics);
        setLatestCar(statistics.latestCar);
      } catch (error) {
        console.error('Error fetching car statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    if (modelSelectorRef.current) {
      modelSelectorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleViewCars = () => {
    if (selectedBrand && selectedModel) {
      navigate(`/cars-list?make=${selectedBrand.brand}&model=${selectedModel}`);
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={`container mx-auto px-4 py-8 mt-16 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <QuickStats stats={stats} t={t} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <BrandSelector
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredBrands={filteredBrands}
          selectedBrand={selectedBrand}
          handleBrandSelect={handleBrandSelect}
          t={t}
        />
        <div ref={modelSelectorRef}>
          {selectedBrand && (
            <ModelSelector
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              handleModelSelect={handleModelSelect}
              t={t}
            />
          )}
        </div>
        {selectedBrand && selectedModel && (
          <SelectedCar
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            handleViewCars={handleViewCars}
            t={t}
          />
        )}
      </div>
      
      {latestCar && <LatestCar car={latestCar} navigate={navigate} t={t} />}
      
      <SellYourCar navigate={navigate} t={t} />
    </div>
  );
};

export default Index;