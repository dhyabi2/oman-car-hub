import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const carBrands = [
  {
    "brand": "Toyota",
    "models": ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
    "logo": "https://www.carlogos.org/car-logos/toyota-logo.png",
    "founded": 1937
  },
  {
    "brand": "Honda",
    "models": ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
    "logo": "https://www.carlogos.org/car-logos/honda-logo.png",
    "founded": 1946
  },
  {
    "brand": "Ford",
    "models": ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
    "logo": "https://www.carlogos.org/car-logos/ford-logo.png",
    "founded": 1903
  },
  {
    "brand": "BMW",
    "models": ["3 Series", "5 Series", "X3", "X5", "7 Series"],
    "logo": "https://www.carlogos.org/car-logos/bmw-logo.png",
    "founded": 1916
  },
  {
    "brand": "Mercedes-Benz",
    "models": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
    "logo": "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
    "founded": 1926
  }
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="h-[calc(100vh-12rem)] overflow-hidden">
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Car Brands</h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {carBrands.map((brand, index) => (
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
    </div>
  );
};

export default Index;