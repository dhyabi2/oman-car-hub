import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export const QuickStats = ({ stats, t }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {Object.entries(stats).map(([key, value]) => {
      if (key === 'latestCar') return null; // Skip latestCar as it's not a statistic
      return (
        <Card key={key}>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">{t[key] || key}</h3>
            <p className="text-2xl font-bold">
              {key === 'averagePrice' || key === 'totalValue' 
                ? `${value.toLocaleString()} OMR` 
                : value}
            </p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

export const BrandSelector = ({ searchTerm, setSearchTerm, filteredBrands, selectedBrand, handleBrandSelect, t }) => (
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

export const ModelSelector = ({ selectedBrand, selectedModel, handleModelSelect, t }) => (
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

export const SelectedCar = ({ selectedBrand, selectedModel, handleViewCars, t }) => (
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

export const LatestCar = ({ car, navigate, t }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{t.latestCar}</h2>
    <Card>
      <CardContent className="p-4">
        <img src={car.photos[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover mb-4 rounded" />
        <h3 className="text-xl font-semibold">{car.year} {car.make} {car.model}</h3>
        <p className="text-lg font-bold">{car.price} OMR</p>
        <Button className="w-full mt-4" onClick={() => navigate(`/car/${car.id}`)}>{t.viewDetails}</Button>
      </CardContent>
    </Card>
  </div>
);

export const SellYourCar = ({ navigate, t }) => (
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