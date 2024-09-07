import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Menu, Palette, Globe, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DraggableThemeSwitch from './DraggableThemeSwitch';

const Navigation = ({ currentTheme, onThemeChange, language, toggleLanguage, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getHeaderClass = () => {
    if (currentTheme === 'national-day') {
      return 'app-header';
    }
    switch (currentTheme) {
      case 'light':
        return 'bg-white text-gray-800';
      case 'dark':
        return 'bg-gray-800 text-white';
      default:
        return `bg-${currentTheme} text-${currentTheme}-foreground`;
    }
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-current">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <DraggableThemeSwitch currentTheme={currentTheme} onThemeChange={onThemeChange} t={t} />
          </PopoverContent>
        </Popover>
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