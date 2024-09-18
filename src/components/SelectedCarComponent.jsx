import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Eye } from 'lucide-react';

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