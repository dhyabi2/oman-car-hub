import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DraggableThemeSwitch = ({ themes, currentIndex, onChange, t }) => {
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setDragX(0);
  }, [currentIndex]);

  const handleDrag = (event, info) => {
    setDragX(info.offset.x);
  };

  const handleDragEnd = (event, info) => {
    const containerWidth = containerRef.current.offsetWidth;
    const dragThreshold = containerWidth / themes.length / 2;

    if (Math.abs(info.offset.x) > dragThreshold) {
      const direction = info.offset.x > 0 ? 1 : -1;
      const newIndex = (currentIndex + direction + themes.length) % themes.length;
      onChange(newIndex);
    }

    setDragX(0);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 flex items-center px-1">
        <motion.div
          className="bg-white dark:bg-gray-800 w-6 h-6 rounded-full shadow-md flex items-center justify-center text-xs font-semibold"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={{ x: dragX }}
        >
          {t[themes[currentIndex].name]}
        </motion.div>
      </div>
      <div className="absolute top-full left-0 right-0 text-center mt-1 text-xs">
        {t[themes[currentIndex].name]}
      </div>
    </div>
  );
};

export default DraggableThemeSwitch;