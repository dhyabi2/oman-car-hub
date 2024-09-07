import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Menu, Globe, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import DraggableThemeSwitch from './DraggableThemeSwitch';

const themes = [
  { name: 'light', value: 'light' },
  { name: 'dark', value: 'dark' },
  { name: 'desertSands', value: 'desert-sands' },
  { name: 'oasisBreeze', value: 'oasis-breeze' },
  { name: 'spiceMarket', value: 'spice-market' },
  { name: 'modernMinimalist', value: 'modern-minimalist' },
  { name: 'coastalCalm', value: 'coastal-calm' },
  { name: 'arabianNights', value: 'arabian-nights' },
  { name: 'bedouinChic', value: 'bedouin-chic' },
  { name: 'techFuturism', value: 'tech-futurism' },
  { name: 'frankincenseTrail', value: 'frankincense-trail' },
  { name: 'royalOpulence', value: 'royal-opulence' },
];

const Navigation = ({ currentTheme, onThemeChange, language, toggleLanguage, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(themes.findIndex(theme => theme.value === currentTheme));

  useEffect(() => {
    setCurrentThemeIndex(themes.findIndex(theme => theme.value === currentTheme));
  }, [currentTheme]);

  const getHeaderClass = () => {
    switch (currentTheme) {
      case 'light':
        return 'bg-white text-gray-800';
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'desert-sands':
        return 'bg-yellow-100 text-yellow-900';
      case 'oasis-breeze':
        return 'bg-blue-100 text-blue-900';
      case 'spice-market':
        return 'bg-red-100 text-red-900';
      case 'modern-minimalist':
        return 'bg-gray-100 text-gray-900';
      case 'coastal-calm':
        return 'bg-blue-50 text-blue-800';
      case 'arabian-nights':
        return 'bg-purple-900 text-purple-100';
      case 'bedouin-chic':
        return 'bg-amber-100 text-amber-900';
      case 'tech-futurism':
        return 'bg-gray-900 text-blue-300';
      case 'frankincense-trail':
        return 'bg-green-100 text-green-900';
      case 'royal-opulence':
        return 'bg-indigo-900 text-yellow-300';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  const handleThemeChange = (newIndex) => {
    setCurrentThemeIndex(newIndex);
    onThemeChange(themes[newIndex].value);
  };

  return (
    <nav className={`p-4 flex justify-between items-center ${getHeaderClass()}`}>
      <Link to="/" className="text-xl font-bold">{t.appName}</Link>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-current" onClick={toggleLanguage}>
          <Globe className="h-4 w-4" />
        </Button>
        <Link to="/favorite">
          <Button variant="ghost" size="icon" className="text-current">
            <Heart className="h-4 w-4" />
          </Button>
        </Link>
        <DraggableThemeSwitch
          themes={themes}
          currentIndex={currentThemeIndex}
          onChange={handleThemeChange}
          t={t}
        />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-current">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className={`w-[300px] sm:w-[400px] ${getHeaderClass()}`}>
            <nav className="flex flex-col space-y-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.to
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="text-lg">{t[item.title.toLowerCase()] || t[item.to.slice(1)] || item.title}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;