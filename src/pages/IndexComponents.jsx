import React from 'react';
import { QuickStats } from "../components/QuickStatsComponent";
import { BrandSelector } from "../components/BrandSelectorComponent";
import { ModelSelector } from "../components/ModelSelectorComponent";
import { SelectedCar } from "../components/SelectedCarComponent";
import { LatestCar } from "../components/LatestCarComponent";
import { SellYourCar } from "../components/SellYourCarComponent";
import { useState, useEffect } from 'react';

export const useAutoSlide = (length, interval = 3000) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, interval);
    return () => clearInterval(timer);
  }, [length, interval]);
  return index;
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export { 
  QuickStats, 
  BrandSelector, 
  ModelSelector, 
  SelectedCar, 
  LatestCar, 
  SellYourCar
};
