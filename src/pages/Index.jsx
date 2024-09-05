import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carBrands } from '../utils/carData';
import { getCarStatistics } from '../utils/indexedDB';
import { QuickStats, BrandSelector, ModelSelector, SelectedCar, LatestCar, SellYourCar } from './IndexComponents';

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
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = carBrands.filter(brand => 
      brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const statistics = await getCarStatistics();
      setStats(statistics);
      setLatestCar(statistics.latestCar);
    };
    fetchData();
  }, []);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleViewCars = () => {
    if (selectedBrand && selectedModel) {
      navigate(`/cars-list?make=${selectedBrand.brand}&model=${selectedModel}`);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <h1 className="text-4xl font-bold mb-8">
        {t.appName}
      </h1>
      
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
        {selectedBrand && (
          <ModelSelector
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            handleModelSelect={handleModelSelect}
            t={t}
          />
        )}
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