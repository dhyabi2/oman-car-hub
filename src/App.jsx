import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Navigation from "./components/Navigation";
import { useState, useEffect } from "react";
import { getLanguage, setLanguage } from "./utils/indexedDB";
import { translations } from "./utils/translations";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getLanguage();
      setLanguageState(lang);
    };
    fetchLanguage();
  }, []);

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    await setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const t = translations[language];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className={`app ${theme} ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <Navigation currentTheme={theme} onThemeChange={setTheme} language={language} toggleLanguage={toggleLanguage} t={t} />
            <Routes>
              {navItems.map(({ to, page: Page }) => (
                <Route 
                  key={to} 
                  path={to} 
                  element={<Page language={language} t={t} />} 
                />
              ))}
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;