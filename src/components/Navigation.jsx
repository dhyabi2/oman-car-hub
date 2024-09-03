import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Menu, X, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Oman Car Hub</Link>
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
      </nav>
      <Link
        to="/add-car"
        className="fixed bottom-6 left-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors duration-200"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </>
  );
};

export default Navigation;