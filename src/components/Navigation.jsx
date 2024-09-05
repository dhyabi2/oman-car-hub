import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Menu, X, Plus, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Desert Sands', value: 'desert-sands' },
  { name: 'Oasis Breeze', value: 'oasis-breeze' },
  { name: 'Spice Market', value: 'spice-market' },
  { name: 'Modern Minimalist', value: 'modern-minimalist' },
  { name: 'Coastal Calm', value: 'coastal-calm' },
  { name: 'Arabian Nights', value: 'arabian-nights' },
  { name: 'Bedouin Chic', value: 'bedouin-chic' },
  { name: 'Tech Futurism', value: 'tech-futurism' },
  { name: 'Frankincense Trail', value: 'frankincense-trail' },
  { name: 'Royal Opulence', value: 'royal-opulence' },
];

const Navigation = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Oman Car Hub</Link>
        <div className="flex items-center space-x-4">
          <Select value={currentTheme} onValueChange={onThemeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gray-800">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {location.pathname === '/' && (
        <Link
          to="/add-car"
          className="fixed bottom-16 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors duration-200 z-50"
        >
          <Plus className="h-6 w-6" />
        </Link>
      )}
    </>
  );
};

export default Navigation;