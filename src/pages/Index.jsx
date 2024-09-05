import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { carBrands } from '../utils/carData';
import { getAllCars } from '../utils/indexedDB';

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(carBrands);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [stats, setStats] = useState({ totalListings: 0, activeSellers: 0, averagePrice: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = carBrands.filter(brand => 
      brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const allCars = await getAllCars();
      setFeaturedCars(allCars.slice(0, 3)); // Get first 3 cars as featured
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Oman Auto Mart</h1>
      
      <QuickStats stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Car Brands</h2>
            <Input
              type="text"
              placeholder="Search brands..."
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
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedBrand ? `${selectedBrand.brand} Models` : "Select a Brand"}
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
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <CardContent className="p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Selected Car</h2>
              {selectedBrand && selectedModel ? (
                <div>
                  <p><strong>Brand:</strong> {selectedBrand.brand}</p>
                  <p><strong>Model:</strong> {selectedModel}</p>
                </div>
              ) : (
                <p>Please select a brand and model</p>
              )}
            </div>
            {selectedBrand && selectedModel && (
              <Button onClick={handleViewCars} className="mt-4">
                View Cars
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      <FeaturedCars cars={featuredCars} />
      
      <SellYourCar />
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

const FeaturedCars = ({ cars }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Featured Cars</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card key={car.id}>
          <CardContent className="p-4">
            <img src={car.photos[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold">{car.year} {car.make} {car.model}</h3>
            <p className="text-lg font-bold">{car.price} OMR</p>
            <Button className="w-full mt-4" onClick={() => navigate(`/car/${car.id}`)}>View Details</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const SellYourCar = () => (
  <Card className="bg-primary text-primary-foreground">
    <CardContent className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Car?</h2>
      <p className="text-xl mb-6">List your car on Oman Auto Mart and reach thousands of potential buyers!</p>
      <Button size="lg" variant="secondary" onClick={() => navigate('/add-car')}>
        List Your Car Now
      </Button>
    </CardContent>
  </Card>
);

export default Index;