import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, List, HelpCircle, Heart } from 'lucide-react';

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
            className={`flex flex-col items-center justify-center w-full h-full ${
              location.pathname === item.to ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;