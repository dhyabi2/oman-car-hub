import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const carBrands = [
  // ... (keep the entire carBrands array as it was)
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const navigate = useNavigate();

  const handleCarListClick = () => {
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
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel(null);
                      setSelectedYear(null);
                    }}
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
                      onClick={() => {
                        setSelectedModel(model);
                        setSelectedYear(null);
                      }}
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
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedModel ? `${selectedModel} Years` : "Select a Model"}
            </h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {selectedModel && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {selectedBrand && selectedModel && (
        <div className="mt-8 flex justify-center">
          <Button onClick={handleCarListClick} className="px-8 py-4 text-lg">
            View Car List
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;