import { HomeIcon, PlusCircleIcon, ListIcon, HelpCircleIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AddCar from "./pages/AddCar.jsx";
import CarsList from "./pages/CarsList.jsx";
import CarDetails from "./pages/CarDetails.jsx";
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
    title: "Car Details",
    to: "/car/:id",
    icon: <ListIcon className="h-4 w-4" />,
    page: <CarDetails />,
  },
  {
    title: "FAQ",
    to: "/faq",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    page: <FAQ />,
  },
];