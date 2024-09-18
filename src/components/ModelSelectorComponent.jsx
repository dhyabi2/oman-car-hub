import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Car } from 'lucide-react';

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