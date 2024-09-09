// Latest modification: Added PWA features and offline support

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { incrementCurrentViewers, decrementCurrentViewers } from "./utils/indexedDB";
import { translations } from "./utils/translations";
import { trackReferral } from "./utils/referral";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import AddCar from "./pages/AddCar";
import CarsList from "./pages/CarsList";
import CarDetails from "./pages/CarDetails";
import Favorite from "./pages/Favorite";
import FAQ from "./pages/FAQ";
import Leaderboard from "./pages/Leaderboard";
import OfflineNotification from "./components/OfflineNotification";

const queryClient = new QueryClient();
const API_BASE_URL = 'https://oman-car-hub.replit.app';

const AppContent = () => {
  const [theme, setThemeState] = useState('light');
  const [language, setLanguageState] = useState('ar');
  const [userId, setUserId] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchUserIdAndSettings = async () => {
      let storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        storedUserId = uuidv4();
        localStorage.setItem('userId', storedUserId);
      }
      setUserId(storedUserId);

      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/${storedUserId}`);
        if (response.ok) {
          const settings = await response.json();
          setThemeState(settings.theme || 'light');
          setLanguageState(settings.language || 'ar');
        } else {
          console.error('Failed to fetch user settings');
        }
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserIdAndSettings();
    incrementCurrentViewers();

    return () => {
      decrementCurrentViewers();
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralKey = searchParams.get('ref');
    const sourceKey = searchParams.get('src');
    if (referralKey && sourceKey) {
      trackReferral(referralKey, sourceKey);
    }
  }, [location]);

  const updateUserSettings = async (newTheme, newLanguage) => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/settings/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: newTheme,
          language: newLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user settings');
      }
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguageState(newLanguage);
    await updateUserSettings(theme, newLanguage);
  };

  const changeTheme = async (newTheme) => {
    setThemeState(newTheme);
    await updateUserSettings(newTheme, language);
  };

  const t = translations[language] || translations['ar'];

  return (
    <div className={`app ${theme} ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navigation currentTheme={theme} onThemeChange={changeTheme} language={language} toggleLanguage={toggleLanguage} t={t} />
      {isOffline && <OfflineNotification t={t} />}
      <Routes>
        <Route path="/" element={<Index language={language} t={t} />} />
        <Route path="/add-car" element={<AddCar language={language} t={t} />} />
        <Route path="/cars-list" element={<CarsList language={language} t={t} />} />
        <Route path="/car/:id" element={<CarDetails language={language} t={t} />} />
        <Route path="/favorite" element={<Favorite language={language} t={t} />} />
        <Route path="/faq" element={<FAQ language={language} t={t} />} />
        <Route path="/leaderboard" element={<Leaderboard language={language} t={t} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;