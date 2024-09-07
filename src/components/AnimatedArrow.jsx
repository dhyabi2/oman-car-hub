import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AnimatedArrow = () => {
  return (
    <motion.div
      className="flex justify-center mt-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
    >
      <ChevronDown className="w-8 h-8 text-primary" />
    </motion.div>
  );
};

export default AnimatedArrow;