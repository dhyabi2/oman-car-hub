import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <motion.div
        className="w-16 h-16 border-4 border-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          borderRadius: ["50%", "25%", "50%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default LoadingAnimation;