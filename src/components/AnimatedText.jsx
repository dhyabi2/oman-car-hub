import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text, className = '' }) => {
  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className={`flex overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;