import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Search } from 'lucide-react';

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