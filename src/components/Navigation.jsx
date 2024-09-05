import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Menu, Sun, Moon, Palette, PlusCircle, HelpCircle, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: 'Light', value: 'light', icon: <Sun className="h-4 w-4" /> },
  { name: 'Dark', value: 'dark', icon: <Moon className="h-4 w-4" /> },
  { name: 'Desert Sands', value: 'desert-sands', icon: <Palette className="h-4 w-4" /> },
  { name: 'Oasis Breeze', value: 'oasis-breeze', icon: <Palette className="h-4 w-4" /> },
  { name: 'Spice Market', value: 'spice-market', icon: <Palette className="h-4 w-4" /> },
  { name: 'Modern Minimalist', value: 'modern-minimalist', icon: <Palette className="h-4 w-4" /> },
  { name: 'Coastal Calm', value: 'coastal-calm', icon: <Palette className="h-4 w-4" /> },
  { name: 'Arabian Nights', value: 'arabian-nights', icon: <Palette className="h-4 w-4" /> },
  { name: 'Bedouin Chic', value: 'bedouin-chic', icon: <Palette className="h-4 w-4" /> },
  { name: 'Tech Futurism', value: 'tech-futurism', icon: <Palette className="h-4 w-4" /> },
  { name: 'Frankincense Trail', value: 'frankincense-trail', icon: <Palette className="h-4 w-4" /> },
  { name: 'Royal Opulence', value: 'royal-opulence', icon: <Palette className="h-4 w-4" /> },
];

const Navigation = ({ currentTheme, onThemeChange, language, toggleLanguage, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentThemeIcon = themes.find(theme => theme.value === currentTheme)?.icon || <Palette className="h-4 w-4" />;

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">{t.appName}</Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white" onClick={toggleLanguage}>
            <Globe className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                {currentThemeIcon}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {themes.map((theme) => (
                <DropdownMenuItem key={theme.value} onSelect={() => onThemeChange(theme.value)}>
                  <div className="flex items-center">
                    {theme.icon}
                    <span className="ml-2">{theme.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                    <span>{t[item.title.toLowerCase()]}</span>
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
          <PlusCircle className="h-6 w-6" />
        </Link>
      )}
    </>
  );
};

export default Navigation;