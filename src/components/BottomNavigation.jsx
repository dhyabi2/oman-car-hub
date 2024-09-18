import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, List, Heart, HelpCircle } from 'lucide-react';

const BottomNavigation = ({ t }) => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: t.home },
    { to: '/add-car', icon: PlusCircle, label: t.addCar },
    { to: '/cars-list', icon: List, label: t.carsList },
    { to: '/favorite', icon: Heart, label: t.favorite },
    { to: '/faq', icon: HelpCircle, label: t.faq },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center justify-center w-full h-full ${
              location.pathname === item.to ? 'text-primary' : 'text-muted-foreground'
            }`}
            aria-label={item.label}
          >
            <Icon className="h-6 w-6" />
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
