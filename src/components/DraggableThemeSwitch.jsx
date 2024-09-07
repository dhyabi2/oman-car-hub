import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const themes = [
  'light', 'dark', 'desert-sands', 'oasis-breeze', 'spice-market',
  'modern-minimalist', 'coastal-calm', 'arabian-nights', 'bedouin-chic',
  'tech-futurism', 'frankincense-trail', 'royal-opulence'
];

const DraggableThemeSwitch = ({ currentTheme, onThemeChange, t }) => {
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const currentIndex = themes.indexOf(currentTheme);
    setDragX((currentIndex / (themes.length - 1)) * 100);
  }, [currentTheme]);

  const handleDrag = (event, info) => {
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const newDragX = (info.point.x / containerWidth) * 100;
    setDragX(Math.max(0, Math.min(newDragX, 100)));

    const themeIndex = Math.round((newDragX / 100) * (themes.length - 1));
    onThemeChange(themes[themeIndex]);
  };

  const getThemeLabel = (theme) => {
    if (!theme) return '';
    const label = t[theme] || theme;
    return label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="p-4">
      <div ref={containerRef} className="relative w-full h-8 bg-gray-200 rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-full cursor-pointer"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x: `${dragX}%` }}
          onDrag={handleDrag}
        />
      </div>
      <div className="mt-2 text-center">
        {getThemeLabel(currentTheme)}
      </div>
    </div>
  );
};

export default DraggableThemeSwitch;