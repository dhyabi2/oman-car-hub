import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Car, Search } from 'lucide-react';
import { fadeInUp } from '../pages/IndexComponents';

export const BrandSelector = ({ searchTerm, setSearchTerm, filteredBrands, selectedBrand, handleBrandSelect, t, language }) => {
  const getBrandTranslation = (brand) => {
    return t[brand.toLowerCase()] || brand;
  };

  const filterBrands = (brands, term) => {
    return brands.filter(brand => 
      brand.brand.toLowerCase().includes(term.toLowerCase()) ||
      getBrandTranslation(brand.brand).toLowerCase().includes(term.toLowerCase())
    );
  };

  const displayedBrands = filterBrands(filteredBrands, searchTerm);

  return (
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
            {displayedBrands.map((brand, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedBrand === brand ? "default" : "outline"}
                  className="w-full h-24 flex flex-col items-center justify-center p-2 space-y-1"
                  onClick={() => handleBrandSelect(brand)}
                >
                  <img src={brand.logo} alt={`${brand.brand} logo`} className="w-10 h-10 object-contain" />
                  <span className="text-xs font-semibold text-center line-clamp-1">
                    {language === 'ar' ? getBrandTranslation(brand.brand) : brand.brand}
                  </span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
