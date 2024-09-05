import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getLanguage, setLanguage, incrementCurrentViewers, decrementCurrentViewers, getTheme, setTheme } from "./utils/indexedDB";
import { translations } from "./utils/translations";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import AddCar from "./pages/AddCar";
import CarsList from "./pages/CarsList";
import CarDetails from "./pages/CarDetails";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setThemeState] = useState('light');
  const [language, setLanguageState] = useState('ar'); // Set initial language to Arabic

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fetchLanguageAndTheme = async () => {
      let lang = await getLanguage();
      if (!lang) {
        // If no language is set, default to Arabic and save it
        lang = 'ar';
        await setLanguage(lang);
      }
      setLanguageState(lang);
      const savedTheme = await getTheme();
      setThemeState(savedTheme);
    };
    fetchLanguageAndTheme();

    // Increment current viewers when the app loads
    incrementCurrentViewers();

    // Decrement current viewers when the app unloads
    return () => {
      decrementCurrentViewers();
    };
  }, []);

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    await setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const changeTheme = async (newTheme) => {
    await setTheme(newTheme);
    setThemeState(newTheme);
  };

  const t = translations[language] || translations['ar']; // Default to Arabic if translation is missing

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className={`app ${theme} ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Navigation currentTheme={theme} onThemeChange={changeTheme} language={language} toggleLanguage={toggleLanguage} t={t} />
            <Routes>
              <Route path="/" element={<Index language={language} t={t} />} />
              <Route path="/add-car" element={<AddCar language={language} t={t} />} />
              <Route path="/cars-list" element={<CarsList language={language} t={t} />} />
              <Route path="/car/:id" element={<CarDetails language={language} t={t} />} />
              <Route path="/faq" element={<FAQ language={language} t={t} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;