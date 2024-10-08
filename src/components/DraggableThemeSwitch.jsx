import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { setTheme } from '../utils/indexedDB';

const themes = [
  { name: 'light', colors: ['#ffffff', '#000000', '#e5e7eb'], arLabel: 'فاتح' },
  { name: 'dark', colors: ['#1f2937', '#ffffff', '#374151'], arLabel: 'داكن' },
  { name: 'desert-sands', colors: ['#fef3c7', '#92400e', '#fbbf24'], arLabel: 'رمال الصحراء' },
  { name: 'oasis-breeze', colors: ['#e0f2fe', '#0369a1', '#7dd3fc'], arLabel: 'نسيم الواحة' },
  { name: 'spice-market', colors: ['#fef2f2', '#991b1b', '#fecaca'], arLabel: 'سوق التوابل' },
  { name: 'modern-minimalist', colors: ['#f9fafb', '#111827', '#e5e7eb'], arLabel: 'الحداثة البسيطة' },
  { name: 'coastal-calm', colors: ['#ecfeff', '#164e63', '#67e8f9'], arLabel: 'هدوء الساحل' },
  { name: 'arabian-nights', colors: ['#581c87', '#faf5ff', '#c084fc'], arLabel: 'ليالي عربية' },
  { name: 'bedouin-chic', colors: ['#fffbeb', '#92400e', '#fcd34d'], arLabel: 'أناقة البدو' },
  { name: 'tech-futurism', colors: ['#030712', '#e0f2fe', '#3b82f6'], arLabel: 'مستقبل التكنولوجيا' },
  { name: 'frankincense-trail', colors: ['#f0fdf4', '#166534', '#86efac'], arLabel: 'طريق اللبان' },
  { name: 'royal-opulence', colors: ['#312e81', '#fef3c7', '#fbbf24'], arLabel: 'الفخامة الملكية' },
  { name: 'national-day', colors: ['#f9fafb', '#dc2626', '#16a34a'], arLabel: 'اليوم الوطني' }
];

const DraggableThemeSwitch = ({ currentTheme, onThemeChange, language }) => {
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastThemeRef = useRef(currentTheme);

  useEffect(() => {
    const currentIndex = themes.findIndex(theme => theme.name === currentTheme);
    setDragX((currentIndex / (themes.length - 1)) * 100);
  }, [currentTheme]);

  const handleDrag = (event, info) => {
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const newDragX = (info.point.x / containerWidth) * 100;
    setDragX(Math.max(0, Math.min(newDragX, 100)));
    isDraggingRef.current = true;

    const themeIndex = Math.round((newDragX / 100) * (themes.length - 1));
    const newTheme = themes[themeIndex]?.name || currentTheme;
    if (newTheme !== lastThemeRef.current) {
      onThemeChange(newTheme);
      lastThemeRef.current = newTheme;
    }
  };

  const handleDragEnd = () => {
    if (isDraggingRef.current) {
      const themeIndex = Math.round((dragX / 100) * (themes.length - 1));
      const newTheme = themes[themeIndex]?.name || currentTheme;
      setTheme(newTheme);
      isDraggingRef.current = false;
    }
  };

  const getThemeLabel = (theme) => {
    if (!theme) return '';
    const themeObj = themes.find(t => t.name === theme);
    return language === 'ar' ? themeObj.arLabel : theme.replace(/-/g, ' ');
  };

  const currentThemeObject = themes.find(theme => theme.name === lastThemeRef.current) || themes[0];

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
          onDragEnd={handleDragEnd}
        />
      </div>
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center">
          <span className="mr-2">{getThemeLabel(lastThemeRef.current)}</span>
          <div className="flex">
            {currentThemeObject.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableThemeSwitch;
