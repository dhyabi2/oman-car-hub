import { HomeIcon, CarIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import CarListings from "./pages/CarListings.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Car Listings",
    to: "/car-listings",
    icon: <CarIcon className="h-4 w-4" />,
    page: <CarListings />,
  },
];