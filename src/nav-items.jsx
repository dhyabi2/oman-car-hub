import { HomeIcon, PlusCircleIcon, ListIcon, HelpCircleIcon, UserIcon, ScaleIcon, CalculatorIcon, ToolIcon, TrendingUpIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AddCar from "./pages/AddCar.jsx";
import CarsList from "./pages/CarsList.jsx";
import FAQ from "./pages/FAQ.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import CompareCars from "./pages/CompareCars.jsx";
import FinancingCalculator from "./pages/FinancingCalculator.jsx";
import MaintenanceTips from "./pages/MaintenanceTips.jsx";
import MarketTrends from "./pages/MarketTrends.jsx";

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
    title: "FAQ",
    to: "/faq",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    page: <FAQ />,
  },
  {
    title: "User Profile",
    to: "/user-profile",
    icon: <UserIcon className="h-4 w-4" />,
    page: <UserProfile />,
  },
  {
    title: "Compare Cars",
    to: "/compare-cars",
    icon: <ScaleIcon className="h-4 w-4" />,
    page: <CompareCars />,
  },
  {
    title: "Financing Calculator",
    to: "/financing-calculator",
    icon: <CalculatorIcon className="h-4 w-4" />,
    page: <FinancingCalculator />,
  },
  {
    title: "Maintenance Tips",
    to: "/maintenance-tips",
    icon: <ToolIcon className="h-4 w-4" />,
    page: <MaintenanceTips />,
  },
  {
    title: "Market Trends",
    to: "/market-trends",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <MarketTrends />,
  },
];