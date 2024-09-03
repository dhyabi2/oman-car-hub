import { HomeIcon, PlusCircleIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AddCarForm from "./pages/AddCarForm.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Add Car",
    to: "/add-car-form",
    icon: <PlusCircleIcon className="h-4 w-4" />,
    page: <AddCarForm />,
  },
];