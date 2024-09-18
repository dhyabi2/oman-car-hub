import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Coins, PlusCircle } from 'lucide-react';

export const SellYourCar = ({ navigate, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <Coins className="mr-2" /> {t.sellYourCar}
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