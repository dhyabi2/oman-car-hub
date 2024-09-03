import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';

const carBrands = [
  { brand: "Toyota", logo: "https://example.com/toyota-logo.png", founded: 1937, models: ["Camry", "Corolla", "RAV4", "Hilux"] },
  { brand: "Honda", logo: "https://example.com/honda-logo.png", founded: 1948, models: ["Civic", "Accord", "CR-V", "Pilot"] },
  { brand: "Ford", logo: "https://example.com/ford-logo.png", founded: 1903, models: ["F-150", "Mustang", "Explorer", "Focus"] },
  { brand: "Nissan", logo: "https://example.com/nissan-logo.png", founded: 1933, models: ["Altima", "Maxima", "Rogue", "Pathfinder"] },
  { brand: "Chevrolet", logo: "https://example.com/chevrolet-logo.png", founded: 1911, models: ["Silverado", "Malibu", "Equinox", "Tahoe"] },
  { brand: "BMW", logo: "https://example.com/bmw-logo.png", founded: 1916, models: ["3 Series", "5 Series", "X3", "X5"] },
  { brand: "Mercedes-Benz", logo: "https://example.com/mercedes-logo.png", founded: 1926, models: ["C-Class", "E-Class", "GLC", "S-Class"] },
  { brand: "Audi", logo: "https://example.com/audi-logo.png", founded: 1909, models: ["A4", "A6", "Q5", "Q7"] },
  { brand: "Hyundai", logo: "https://example.com/hyundai-logo.png", founded: 1967, models: ["Elantra", "Sonata", "Tucson", "Santa Fe"] },
  { brand: "Kia", logo: "https://example.com/kia-logo.png", founded: 1944, models: ["Optima", "Sorento", "Sportage", "Telluride"] },
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      navigate('/add-car-form', { state: { brand: selectedBrand.brand, model: selectedModel, year: selectedYear } });
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
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedBrand || !selectedModel || !selectedYear}
          className="px-8 py-4 text-lg"
        >
          Continue to Add Car Form
        </Button>
      </div>
    </div>
  );
};

export default Index;