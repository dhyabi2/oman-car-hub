import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Users, BarChart, Award, Zap, Clock, Eye, Coins } from 'lucide-react';

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
      case 'averagePrice': return <Coins />;
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