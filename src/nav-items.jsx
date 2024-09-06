import { HomeIcon, PlusCircleIcon, ListIcon, HelpCircleIcon, HeartIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AddCar from "./pages/AddCar.jsx";
import CarsList from "./pages/CarsList.jsx";
import Favorite from "./pages/Favorite.jsx";
import FAQ from "./pages/FAQ.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Add Car",
    to: "/add-car",
    icon: <PlusCircleIcon className="h-4 w-4" />,
    page: <AddCar />,
  },
  {
    title: "Cars List",
    to: "/cars-list",
    icon: <ListIcon className="h-4 w-4" />,
    page: <CarsList />,
  },
  {
    title: "Favorites",
    to: "/favorite",
    icon: <HeartIcon className="h-4 w-4" />,
    page: <Favorite />,
  },
  {
    title: "FAQ",
    to: "/faq",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    page: <FAQ />,
  },
];