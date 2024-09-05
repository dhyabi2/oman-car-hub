import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { carBrands } from '../utils/carData';
import { getAllCars, getLanguage, setLanguage } from '../utils/indexedDB';
import { translations } from '../utils/translations';
import { Globe } from 'lucide-react';

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(carBrands);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [stats, setStats] = useState({ totalListings: 0, activeSellers: 0, averagePrice: 0 });
  const [language, setLanguageState] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getLanguage();
      setLanguageState(lang);
    };
    fetchLanguage();
  }, []);

  useEffect(() => {
    const filtered = carBrands.filter(brand => 
      brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const allCars = await getAllCars();
      setFeaturedCars(allCars.slice(0, 3));
      setStats({
        totalListings: allCars.length,
        activeSellers: new Set(allCars.map(car => car.seller_id)).size,
        averagePrice: Math.round(allCars.reduce((sum, car) => sum + car.price, 0) / allCars.length)
      });
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

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    await setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const t = translations[language];

  return (
    <div className={`container mx-auto px-4 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Oman Auto Mart</h1>
        <Button onClick={toggleLanguage} variant="outline" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
      </div>
      
      <QuickStats stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <BrandSelector
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredBrands={filteredBrands}
          selectedBrand={selectedBrand}
          handleBrandSelect={handleBrandSelect}
          t={t}
          language={language}
        />
        <ModelSelector
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          handleModelSelect={handleModelSelect}
          t={t}
          language={language}
        />
        <SelectedCar
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          handleViewCars={handleViewCars}
          t={t}
          language={language}
        />
      </div>
      
      <FeaturedCars cars={featuredCars} navigate={navigate} t={t} language={language} />
      
      <SellYourCar navigate={navigate} t={t} language={language} />
    </div>
  );
};

const QuickStats = ({ stats }) => (
  <div className="grid grid-cols-3 gap-4 mb-8">
    {Object.entries(stats).map(([key, value]) => (
      <Card key={key}>
        <CardContent className="p-4 text-center">
          <h3 className="text-lg font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const BrandSelector = ({ searchTerm, setSearchTerm, filteredBrands, selectedBrand, handleBrandSelect, t, language }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-hidden">
    <CardContent className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{t.brandSelector}</h2>
      <Input
        type="text"
        placeholder={t.searchBrands}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[calc(100vh-22rem)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredBrands.map((brand, index) => (
            <Button
              key={index}
              variant={selectedBrand === brand ? "default" : "outline"}
              className="w-full h-24 flex flex-col items-center justify-center p-2 space-y-1"
              onClick={() => handleBrandSelect(brand)}
            >
              <img src={brand.logo} alt={`${brand.brand} logo`} className="w-10 h-10 object-contain" />
              <span className="text-xs font-semibold text-center line-clamp-1">{brand.brand}</span>
              <span className="text-xs text-gray-500">Est. {brand.founded}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

const ModelSelector = ({ selectedBrand, selectedModel, handleModelSelect, t, language }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-hidden">
    <CardContent className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {selectedBrand ? `${selectedBrand.brand} ${t.model}` : t.modelSelector}
      </h2>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        {selectedBrand && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {selectedBrand.models.map((model, index) => (
              <Button
                key={index}
                variant={selectedModel === model ? "default" : "outline"}
                className="w-full"
                onClick={() => handleModelSelect(model)}
              >
                {model}
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);

const SelectedCar = ({ selectedBrand, selectedModel, handleViewCars, t, language }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-hidden">
    <CardContent className="p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t.selectedCar}</h2>
        {selectedBrand && selectedModel ? (
          <div>
            <p><strong>{t.brand}:</strong> {selectedBrand.brand}</p>
            <p><strong>{t.model}:</strong> {selectedModel}</p>
          </div>
        ) : (
          <p>{t.modelSelector}</p>
        )}
      </div>
      {selectedBrand && selectedModel && (
        <Button onClick={handleViewCars} className="mt-4">
          {t.viewCars}
        </Button>
      )}
    </CardContent>
  </Card>
);

const FeaturedCars = ({ cars, navigate, t, language }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{t.featuredCars}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card key={car.id}>
          <CardContent className="p-4">
            <img src={car.photos[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold">{car.year} {car.make} {car.model}</h3>
            <p className="text-lg font-bold">{car.price} OMR</p>
            <Button className="w-full mt-4" onClick={() => navigate(`/car/${car.id}`)}>{t.viewDetails}</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const SellYourCar = ({ navigate, t, language }) => (
  <Card className="bg-primary text-primary-foreground">
    <CardContent className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">{t.sellYourCar}</h2>
      <p className="text-xl mb-6">{t.listingMessage}</p>
      <Button size="lg" variant="secondary" onClick={() => navigate('/add-car')}>
        {t.listYourCar}
      </Button>
    </CardContent>
  </Card>
);

export default Index;