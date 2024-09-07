import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Car, DollarSign, Users, BarChart, Award, Zap, Clock, Eye, Search, Sparkles, PlusCircle } from 'lucide-react';

const useAutoSlide = (length, interval = 3000) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, interval);
    return () => clearInterval(timer);
  }, [length, interval]);
  return index;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const QuickStats = ({ stats, t }) => {
  const statEntries = Object.entries(stats || {}).filter(([key]) => key !== 'latestCar');
  const currentIndex = useAutoSlide(statEntries.length || 1);

  const formatStatValue = (key, value) => {
    if (key === 'averagePrice') {
      return `${value?.toLocaleString() || 0} ${t.currency}`;
    }
    return value || 0;
  };

  const getIconForStat = (key) => {
    switch (key) {
      case 'totalListings': return <Car />;
      case 'activeSellers': return <Users />;
      case 'averagePrice': return <DollarSign />;
      case 'mostPopularBrand': return <Award />;
      case 'mostExpensiveCar': return <Zap />;
      case 'newestListing': return <Clock />;
      case 'currentViewers': return <Eye />;
      default: return <BarChart />;
    }
  };

  if (statEntries.length === 0) {
    return (
      <div className="relative h-24 mb-8 overflow-hidden">
        <Card className="w-full max-w-sm">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold flex items-center justify-center">
              <BarChart className="mr-2" />
              <span className="ml-2">{t.noStatsAvailable}</span>
            </h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-24 mb-8 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-sm">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-semibold flex items-center justify-center">
                {getIconForStat(statEntries[currentIndex][0])}
                <span className="ml-2">{t[statEntries[currentIndex][0]]}</span>
              </h3>
              <p className="text-2xl font-bold">
                {formatStatValue(statEntries[currentIndex][0], statEntries[currentIndex][1])}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const BrandSelector = ({ searchTerm, setSearchTerm, filteredBrands, selectedBrand, handleBrandSelect, t }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-hidden">
    <CardContent className="p-4">
      <motion.h2 className="text-2xl font-semibold mb-4 flex items-center" {...fadeInUp}>
        <Car className="mr-2" /> {t.brandSelector}
      </motion.h2>
      <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Input
            type="text"
            placeholder={t.searchBrands}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </motion.div>
      <ScrollArea className="h-[calc(100vh-22rem)]">
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-4" {...fadeInUp} transition={{ delay: 0.2 }}>
          {filteredBrands.map((brand, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={selectedBrand === brand ? "default" : "outline"}
                className="w-full h-24 flex flex-col items-center justify-center p-2 space-y-1"
                onClick={() => handleBrandSelect(brand)}
              >
                <img src={brand.logo} alt={`${brand.brand} logo`} className="w-10 h-10 object-contain" />
                <span className={`text-xs font-semibold text-center line-clamp-1 ${brand.brand.length > 10 ? 'text-[10px]' : ''}`}>
                  {brand.brand}
                </span>
                <span className="text-xs text-gray-500">Est. {brand.founded}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </CardContent>
  </Card>
);

export const ModelSelector = ({ selectedBrand, selectedModel, handleModelSelect, t }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-hidden">
    <CardContent className="p-4">
      <motion.h2 className="text-2xl font-semibold mb-4 flex items-center" {...fadeInUp}>
        {selectedBrand ? (
          <>
            <Car className="mr-2" />
            {`${selectedBrand.brand} ${t.model}`}
          </>
        ) : (
          <>
            <Car className="mr-2" />
            {t.modelSelector}
          </>
        )}
      </motion.h2>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        {selectedBrand && (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-4" {...fadeInUp} transition={{ delay: 0.1 }}>
            {selectedBrand.models.map((model, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedModel === model ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleModelSelect(model)}
                >
                  {model}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);

export const SelectedCar = ({ selectedBrand, selectedModel, handleViewCars, t }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-hidden">
    <CardContent className="p-4 flex flex-col justify-between">
      <div>
        <motion.h2 className="text-2xl font-semibold mb-4 flex items-center" {...fadeInUp}>
          <Sparkles className="mr-2" /> {t.selectedCar}
        </motion.h2>
        {selectedBrand && selectedModel ? (
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <p><strong>{t.brand}:</strong> {selectedBrand.brand}</p>
            <p><strong>{t.model}:</strong> {selectedModel}</p>
          </motion.div>
        ) : (
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>{t.modelSelector}</motion.p>
        )}
      </div>
      {selectedBrand && selectedModel && (
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Button onClick={handleViewCars} className="mt-4 w-full flex items-center justify-center">
            <Eye className="mr-2" />
            {t.viewCars}
          </Button>
        </motion.div>
      )}
    </CardContent>
  </Card>
);

export const LatestCar = ({ car, navigate, t }) => (
  <motion.div className="mb-8" {...fadeInUp}>
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <Zap className="mr-2" /> {t.latestCar}
    </h2>
    <Card>
      <CardContent className="p-4">
        <motion.img
          src={car.photos[0]}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover mb-4 rounded"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <h3 className="text-xl font-semibold">{car.year} {car.make} {car.model}</h3>
        <p className="text-lg font-bold">{car.price} {t.currency}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="w-full mt-4 flex items-center justify-center" onClick={() => navigate(`/car/${car.id}`)}>
            <Search className="mr-2" />
            {t.viewDetails}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

export const SellYourCar = ({ navigate, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <DollarSign className="mr-2" /> {t.sellYourCar}
        </h2>
        <p className="text-xl mb-6">{t.listingMessage}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" variant="secondary" onClick={() => navigate('/add-car')} className="flex items-center">
            <PlusCircle className="mr-2" />
            {t.listYourCar}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);