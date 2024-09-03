import { HomeIcon, PlusCircleIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AddCarListing from "./pages/AddCarListing.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Add Car Listing",
    to: "/add-car-listing",
    icon: <PlusCircleIcon className="h-4 w-4" />,
    page: <AddCarListing />,
  },
];