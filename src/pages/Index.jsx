import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const carBrands = [
  {
    "brand": "Seat",
    "models": ["Alhambra", "Altea", "Altea XL", "Arosa", "Cordoba", "Cordoba Vario", "Exeo", "Ibiza", "Ibiza ST", "Exeo ST", "Leon", "Leon ST", "Inca", "Mii", "Toledo"],
    "logo": "https://www.carlogos.org/car-logos/seat-logo.png",
    "founded": 1950
  },
  {
    "brand": "Renault",
    "models": ["Captur", "Clio", "Clio Grandtour", "Espace", "Express", "Fluence", "Grand Espace", "Grand Modus", "Grand Scenic", "Kadjar", "Kangoo", "Kangoo Express", "Koleos", "Laguna", "Laguna Grandtour", "Latitude", "Mascott", "Mégane", "Mégane CC", "Mégane Combi", "Mégane Grandtour", "Mégane Coupé", "Mégane Scénic", "Scénic", "Talisman", "Talisman Grandtour", "Thalia", "Twingo", "Wind", "Zoé"],
    "logo": "https://www.carlogos.org/car-logos/renault-logo.png",
    "founded": 1899
  },
  // ... (other car brands)
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-crazy-100 to-crazy-300">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-crazy-400 animate-pulse">
        Oman Auto Mart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="h-[calc(100vh-12rem)] overflow-hidden bg-crazy-200 border-4 border-crazy-500">
          <CardContent className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-crazy-100">Car Brands</h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {carBrands.map((brand, index) => (
                  <Button
                    key={index}
                    variant={selectedBrand === brand ? "default" : "outline"}
                    className={`w-full h-24 flex flex-col items-center justify-center p-2 space-y-1 ${
                      selectedBrand === brand ? 'bg-crazy-500 text-crazy-200' : 'bg-crazy-400 text-crazy-100'
                    } hover:animate-wiggle transition-all duration-300`}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel(null);
                      setSelectedYear(null);
                    }}
                  >
                    <img src={brand.logo} alt={`${brand.brand} logo`} className="w-10 h-10 object-contain" />
                    <span className="text-xs font-semibold text-center line-clamp-1">{brand.brand}</span>
                    <span className="text-xs">Est. {brand.founded}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="h-[calc(100vh-12rem)] overflow-hidden bg-crazy-300 border-4 border-crazy-100">
          <CardContent className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-crazy-500">
              {selectedBrand ? `${selectedBrand.brand} Models` : "Select a Brand"}
            </h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {selectedBrand && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedBrand.models.map((model, index) => (
                    <Button
                      key={index}
                      variant={selectedModel === model ? "default" : "outline"}
                      className={`w-full ${
                        selectedModel === model ? 'bg-crazy-100 text-crazy-300' : 'bg-crazy-500 text-crazy-400'
                      } hover:animate-pulse transition-all duration-300`}
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
        <Card className="h-[calc(100vh-12rem)] overflow-hidden bg-crazy-400 border-4 border-crazy-200">
          <CardContent className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-crazy-300">
              {selectedModel ? `${selectedModel} Years` : "Select a Model"}
            </h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {selectedModel && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      className={`w-full ${
                        selectedYear === year ? 'bg-crazy-200 text-crazy-400' : 'bg-crazy-100 text-crazy-500'
                      } hover:animate-wiggle transition-all duration-300`}
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
    </div>
  );
};

export default Index;