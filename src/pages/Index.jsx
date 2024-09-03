import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const carBrands = [
  { brand: "Toyota", logo: "https://example.com/toyota-logo.png", founded: 1937, models: ["Camry", "Corolla", "RAV4", "Hilux", "Land Cruiser"] },
  { brand: "Honda", logo: "https://example.com/honda-logo.png", founded: 1948, models: ["Civic", "Accord", "CR-V", "Pilot", "Jazz"] },
  { brand: "Ford", logo: "https://example.com/ford-logo.png", founded: 1903, models: ["F-150", "Mustang", "Explorer", "Focus", "Ranger"] },
  { brand: "Chevrolet", logo: "https://example.com/chevrolet-logo.png", founded: 1911, models: ["Silverado", "Camaro", "Equinox", "Malibu", "Tahoe"] },
  { brand: "Nissan", logo: "https://example.com/nissan-logo.png", founded: 1933, models: ["Altima", "Rogue", "Sentra", "Pathfinder", "Maxima"] },
  { brand: "BMW", logo: "https://example.com/bmw-logo.png", founded: 1916, models: ["3 Series", "5 Series", "X3", "X5", "7 Series"] },
  { brand: "Mercedes-Benz", logo: "https://example.com/mercedes-logo.png", founded: 1926, models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"] },
  { brand: "Audi", logo: "https://example.com/audi-logo.png", founded: 1909, models: ["A4", "A6", "Q5", "Q7", "TT"] },
  { brand: "Hyundai", logo: "https://example.com/hyundai-logo.png", founded: 1967, models: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"] },
  { brand: "Kia", logo: "https://example.com/kia-logo.png", founded: 1944, models: ["Optima", "Sorento", "Sportage", "Soul", "Telluride"] },
  { brand: "Volkswagen", logo: "https://example.com/vw-logo.png", founded: 1937, models: ["Golf", "Passat", "Tiguan", "Atlas", "Jetta"] },
  { brand: "Mazda", logo: "https://example.com/mazda-logo.png", founded: 1920, models: ["Mazda3", "Mazda6", "CX-5", "CX-9", "MX-5 Miata"] },
  { brand: "Subaru", logo: "https://example.com/subaru-logo.png", founded: 1953, models: ["Outback", "Forester", "Impreza", "Legacy", "Crosstrek"] },
  { brand: "Lexus", logo: "https://example.com/lexus-logo.png", founded: 1989, models: ["RX", "ES", "NX", "IS", "GX"] },
  { brand: "Volvo", logo: "https://example.com/volvo-logo.png", founded: 1927, models: ["XC90", "XC60", "S60", "V60", "XC40"] },
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    navigate('/car-listings', { state: { brand: selectedBrand.brand, model: model } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Oman Auto Mart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    onClick={() => setSelectedBrand(brand)}
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
                      variant="outline" 
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
      </div>
    </div>
  );
};

export default Index;